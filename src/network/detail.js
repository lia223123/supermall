import {request} from "./request";
export function detail(iid){
  return request({
    url: '/detail',
    params: {
      iid
    }
  })

}