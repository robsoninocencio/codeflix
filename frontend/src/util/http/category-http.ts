import { httpVideo } from ".";
import HttpResource from "./http-resource";

const categoryHttp = new HttpResource(httpVideo, "categories");

export default categoryHttp;
