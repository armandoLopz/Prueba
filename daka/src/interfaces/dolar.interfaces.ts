export interface Datetime {
    date: string;
    time: string;
}

export interface MonitorData {
    change: number;
    color: 'green' | 'red' | 'blue' | 'yellow' | 'gray';
    image: string;
    last_update: string;
    last_update_old: string | null;
    percent: number;
    price: number;
    price_old: number;
    symbol: string;
    title: string;
}


export interface Monitors {
    bcv: MonitorData;
    enparalelovzla: MonitorData;

}

export interface ApiDolarResponse {
    datetime: Datetime;
    monitors: Monitors;
}