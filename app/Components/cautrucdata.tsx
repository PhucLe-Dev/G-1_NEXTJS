interface oneCate {
    id: number,
    ten_loai: string,
    thu_tu: number,
    an_hien: number
}

interface oneProd {
    id: number,
    ten_sp: string,
    slug: string,
    gia: number,
    gia_km: number,
    ngay: string,
    hinh: string,
    id_loai: number,
    luot_xem: number,
    hot: string,
    an_hien: string,
    tinh_chat: string
}

interface ICart {
    id:number;
    ten_sp:string;
    gia_mua:number;
    gia_tong: number;
    hinh:string;
    so_luong:number;
}

export type {oneCate, oneProd, ICart};