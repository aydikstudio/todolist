export interface IList {
    id: number,
    title: string,
    status: string
  }
  



export function getStatus(item: string) {
    let status:string='';
    if (item == 'active') {
        status = 'completed'
      } else {
        status = 'active'
      }
    
      return status
}

export function addNewObj(title: string) {
    let list_obj:IList = {
        id: Date.now(),
        title: title,
        status: 'active'
      }

      return list_obj;
}