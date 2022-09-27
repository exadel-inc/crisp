export class ServerDataSync {
  private static _instanse: any;
  private serverNotificationEventSource: any;

  constructor() {
    if(ServerDataSync._instanse) {
      return ServerDataSync._instanse;
    }

    ServerDataSync._instanse = this;

    return ServerDataSync._instanse;
  }

  unSendedDataEngine() {

  }

  serverUpdateDbDataNotification(host: string) {
    if(!this.serverNotificationEventSource) {
      this.serverNotificationEventSource = new EventSource(host, {
        withCredentials: true
      });
    }

    this.serverNotificationEventSource.onmessage = (e: any) => {
      alert('Событие: message, данные: ' + e.data);
    };
  }
}