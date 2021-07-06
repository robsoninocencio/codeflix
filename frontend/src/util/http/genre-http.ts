import { httpVideo } from ".";
import HttpResource from "./http-resource";

const genreHttp = new HttpResource(httpVideo, "genres");

export default genreHttp;
