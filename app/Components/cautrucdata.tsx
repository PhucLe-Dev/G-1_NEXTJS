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
export type {oneCate, oneProd};