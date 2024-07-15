import {
  makeProducerResponse,
  makeProductResponse,
} from '../../utils/response_mapper';
import { Producer, Product } from '../../mongodb/models';
import fs from 'fs';
import csv from 'csv-parser';

export interface fetchProductsArgs {
  _url: string;
}

export const fetchProducts = async (args: fetchProductsArgs) => {
  console.log('fetch url : ', args._url);
  const productsJson: any = [];

  fs.createReadStream('products.csv')
    .pipe(csv())
    .on('error', (error: any) =>
      console.log(`Error while reading the stream.. ${error}`)
    )
    .on('finish', () => console.log(`Stream finished.`))
    .on('drain', () => console.log(`Stream drained.`))
    .on('data', (data: any) => productsJson.push(data))
    .on('end', async () => {
      console.log('CSV products  length >>> ', productsJson.length);

      const batches: any[] = [];
      const batchSize = 100;

      while (productsJson.length > 0)
        batches.push(productsJson.splice(0, batchSize));

      const producersProcess = async () => {
        console.log('--------- Processing producers ------- ');
        for (let i = 0; i < batches.length; i++) {
          const batch: any = batches[i];

          const producerBulkOps: any = [];

          for (let index = 0; index < batch.length; index++) {
            const p = batch[index];

            const newProducer = makeProducerResponse(p);
            let upsertDoc = {
              updateOne: {
                filter: {
                  name: newProducer.name,
                  country: newProducer.country,
                  region: newProducer.region,
                },
                update: newProducer,
                upsert: true,
              },
            };

            producerBulkOps.push(upsertDoc);
          }

          await Producer.bulkWrite(producerBulkOps)
            .then((bulkWriteOpResult) => {
              if (bulkWriteOpResult.upsertedCount > 0) {
                console.log(
                  `Bulk Upserted ${bulkWriteOpResult.upsertedCount} Producers in batch: ${i}`
                );
              }
            })
            .catch((err) => {
              console.log(`Producers BULK upsert error in batch ${i}`);
              console.log(JSON.stringify(err));
            });
        }
      };

      const productsProcess = async () => {
        console.log('-------- Processing products --------');
        for (let j = 0; j < batches.length; j++) {
          const batch = batches[j];
          const productBulkOps: any = [];

          for (let k = 0; k < batch.length; k++) {
            const product = batch[k];

            const productsProducer = await Producer.collection.findOne({
              name: product['Producer'],
              country: product['Country'],
              region: product['Region'],
            });

            let newProduct = makeProductResponse(
              product,
              `${productsProducer?._id}`
            );

            let upsertProduct = {
              updateOne: {
                filter: {
                  vintage: newProduct.vintage,
                  name: newProduct.name,
                  producerId: newProduct.producerId,
                },
                update: newProduct,
                upsert: true,
              },
            };

            productBulkOps.push(upsertProduct);
          }

          await Product.bulkWrite(productBulkOps)
            .then((bulkWriteOpResult) => {
              if (bulkWriteOpResult.upsertedCount > 0) {
                console.log(
                  `Bulk Upserted ${bulkWriteOpResult.upsertedCount} Products in batch: ${j}`
                );
              } else {
                console.log('fast processed batch: ', j);
              }
            })
            .catch((err) => {
              console.log(`Products BULK upsert error in batch ${j}`);
              console.log(JSON.stringify(err));
            });
        }
      };

      producersProcess().then(async () => {
        productsProcess();
      });
      // });
    });

  return true;
};
