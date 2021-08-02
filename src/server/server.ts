require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import { TSearchEndpointRequest, TSearchEndpointResponse } from "../common/search-endpoint";
import type {
  TSimpleIncementRequest,
  TSimpleIncementResponse,
  TSimpleRoleResponse,
} from "../common/simple-api-caller";
import { envConfig, envRole } from "../common/simple-api-caller";
import { ParamsDictionary } from "express-serve-static-core";
import _ from "lodash";
import fs from "fs";
import {
  PUBLIC_CTX_PATH,
  IMAGE_INFO_SEARCH_ENDPOINT_PATH,
  IMAGE_INFO_DELETE_ENDPOINT_PATH,
  IMAGE_INFO_PUT_ENDPOINT_PATH,
  PRINTED_EMAILS_ENDPOINT_PATH,
  SIMPLE_API_CALL_ROLE_PATH,
  SIMPLE_API_CALL_INCREMENT_PATH,
} from "../common/endpoints";

import { TDeleteEndpointResponse } from "../common/delete-endpoint";
import "isomorphic-fetch";
import {
  TAuthorUpdateEndpointRequest,
  TAuthorUpdateEndpointResponse,
} from "../common/update-endpoint";
import { TPrintedMailsResponse } from "../common/printed-mails-endpoint";
import { constants } from "buffer";

const corsOptions = {
    maxAge: 86000
  }
const cors = require('cors')(corsOptions);  

const config = envConfig[envRole];

export const unsplashJsonPath = "./data/unsplash.json";
export const PORT = Number(process.env.PORT) || Number(config.port);
export const app = express();
if (envRole === 'hacker') {
    console.log('!!! Enabling cors on hacker server !!!');
    app.use(cors);
}
app.use(bodyParser.json());
app.use(PUBLIC_CTX_PATH, express.static("public"));
app.use("/", express.static("build"));

app.post<{}, TSearchEndpointResponse, TSearchEndpointRequest>(
  IMAGE_INFO_SEARCH_ENDPOINT_PATH,
  (req, res) => {
    // const found = _.filter(metaImagesDatabase, it => _.includes(it.user.name.toLowerCase(), req.body.search.toLocaleLowerCase()));
    // const results = _.map(found, (item => {
    //     return {
    //         id: item.id,
    //         downloadUrl: item.urls.full,
    //         width: item.width,
    //         height: item.height,
    //         author: item.user.name,
    //         imageV300Url: item.urls.full + v300QueryString,
    //         widthV300: calcWidth(300, item.width, item.height)
    //     }
    // }));
    // res.send(results)
  }
);

app.delete<ParamsDictionary, TDeleteEndpointResponse, {}>(
  IMAGE_INFO_DELETE_ENDPOINT_PATH + "/:id",
  (req, res) => {
    // const id = req.params.id;
    // _.remove(metaImagesDatabase, {"id": id});
    // res.send({id})
  }
);

app.put<{}, TAuthorUpdateEndpointResponse, TAuthorUpdateEndpointRequest>(
  IMAGE_INFO_PUT_ENDPOINT_PATH,
  (req, res) => {
    // const id = req.body.id;
    // const author = req.body.author;
    // const dataToChange = _.find(metaImagesDatabase, {"id": id});
    // if (dataToChange) {
    //     dataToChange.user.name = author;
    // }
    // setTimeout(() => {
    //     res.send({id, author});
    // }, 1000);
  }
);

app.get<ParamsDictionary, TPrintedMailsResponse>(PRINTED_EMAILS_ENDPOINT_PATH, async (req, res) => {
  // const results = await readProcessedMessages();
  // res.send(results)
});

app.get<ParamsDictionary, TSimpleRoleResponse>(SIMPLE_API_CALL_ROLE_PATH, async (req, res) => {
  res.send({ role: envRole, originPort: PORT, requestUrl: envConfig[envRole].url });
});

app.get<ParamsDictionary, TSimpleIncementResponse>(
    SIMPLE_API_CALL_INCREMENT_PATH,
    cors,
    async (req, res) => {
      res.send({ value: 1});
    }
  );
app.options(SIMPLE_API_CALL_INCREMENT_PATH, cors)
app.put<ParamsDictionary, TSimpleIncementResponse, TSimpleIncementRequest>(
  SIMPLE_API_CALL_INCREMENT_PATH,
  cors,
  async (req, res) => {
    res.send({ value: req.body.value });
  }
);

console.log(`Server is started on port ${PORT}`);
app.listen(PORT);
