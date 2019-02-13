import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient:HttpClient) { }

  getGlobalStocks(){
    return this.httpClient.get("/api/Commodity");
  }

  
  getStocksOfCommodity(commodityId,uid){
    let resource = JSON.stringify({where: { and : [{commodityId:commodityId},{open:true},{ownerId:{neq:uid}}]}});
    let httpParams = new HttpParams().set('filter', resource);
    return this.httpClient.get('/api/Crop',{params:httpParams});
  }

  getUser(userId){
    return this.httpClient.get('/api/User/'+userId);
  }

  getCommodity(commodityId){
    return this.httpClient.get('/api/Commodity/'+commodityId)
  }

  getCrop(cropId){
    return this.httpClient.get('/api/Crop/'+cropId)
    
  }

  getMessages(userId){
    let resource = JSON.stringify({where:{userId : userId}});
    let httpParams = new HttpParams().set('filter',resource);
    return this.httpClient.get('/api/Messages',{params:httpParams});
  }

  getRequests(userId){
    let resource = JSON.stringify({where:{owner : userId}});
    let httpParams = new HttpParams().set('filter',resource);
    return this.httpClient.get('/api/StockRequest',{params:httpParams});
  }

  getStocks(ownerId){
    let resource = JSON.stringify({where:{ownerId:ownerId}});
    let httpParams = new HttpParams().set('filter',resource);
    return this.httpClient.get('/api/Crop', {params:httpParams});    
  }

  getShares(ownerId){
    let resource = JSON.stringify({where:{ownerId:ownerId}});
    let httpParams = new HttpParams().set('filter',resource);
    return this.httpClient.get('/api/Share', {params:httpParams});
  }

  createStock(stock){
    return this.httpClient.post("/api/Crop",{
      "$class": "org.farm.network.Crop",
      "insuranceId": stock.insuranceId,
      "commodityId": stock.commodity,
      "ownerId": stock.owner,
      "quantity": stock.quantity,
      "place": stock.place,
      "type" : stock.type,
      "harvestDate" :stock.harvestDate,
      "open" : stock.open
    });
  }

  createMessage(message){
    return this.httpClient.post('/api/Messages',{
      "$class": "org.farm.network.Messages",
      "messageId": message.id,
      "title": message.title,
      "description": message.description,
      "userId": message.userId
    })
  }

  createRequest(request){
    return this.httpClient.post('/api/StockRequest',{
      "$class": "org.farm.network.StockRequest",
      "requestId": request.requestId,
      "owner": request.ownerId,
      "requestor": request.requestorId,
      "insuranceId": request.cropId,
      "quantity": request.quantity,
       "title":request.title,
       "description": request.description 
    })
  }

  
  acceptRequest(requestId){
    return this.httpClient.post('/api/StockTransaction',{
      requestId : requestId,
      "$class": "org.farm.network.stockTransaction",
    })
  }

  notifyShareHolders(cropId){
    return this.httpClient.post('/api/StockReady',{
      "$class": "org.farm.network.stockReady",
      "stockId": cropId     
    });
  }


  updateCommodity(commodity){
    let commodityId = commodity.commodityId;
    delete commodity.commodityId;
    return this.httpClient.put('/api/Commodity/'+commodityId,commodity);  
  }

  updateStockOpen(stock){
    let insuranceId = stock.insuranceId;
    delete stock.insuranceId;
    return this.httpClient.put('/api/Crop/'+insuranceId,stock);
  }

  updateShare(shareId, newOwnerId){
    return this.httpClient.post('/api/transferShare',{
      shareId:shareId,
      newOwnerId : newOwnerId
    });
  }

  deleteMessage(messageId){
    return this.httpClient.delete('/api/Messages/' + messageId);
  }

  deleteRequest(requestId){
    return this.httpClient.delete('/api/StockRequest/'+requestId);
  }




}
