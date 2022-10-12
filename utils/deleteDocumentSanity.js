import client from "./client"
const deleteTicket = () =>{
    client
      .delete({query: '*[_type == "ticket"][0...999]'})
      .then(console.log)
      .catch(console.error)

}

const deleteOrder = async() =>{
    const res = await client.delete({query: '*[_type == "order"][0...999]'});
    console.log(res)
}

const deleteOrderItems = () =>{
    client
      .delete({query: '*[_type == "orderItem"][0...999]'})
      .then(console.log)
      .catch(console.error)
}

export {
    deleteOrder,
    deleteOrderItems,
    deleteTicket,
}