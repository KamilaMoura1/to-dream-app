import { Model as BaseModel } from "vue-api-query";

export default class Model extends BaseModel {
    baseUrl() {
        return "http://localhost:3000"
    }

    request(config) {
        return this.$http.request(config);
    }
}