import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { ICart } from "../Components/cautrucdata";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        listSP: [] as ICart[],
        order: {}
    },
    reducers: {
        ThemSP: (state, param) => {
            const { sp, quantity } = param.payload;
            const index = state.listSP.findIndex((s: ICart) => s.id === sp.id);
            
            if (index >= 0) {
                // Sản phẩm đã tồn tại, tăng số lượng theo quantity từ payload
                state.listSP[index].so_luong += quantity;
                // Cập nhật giá tổng dựa trên giá mua
                state.listSP[index].gia_tong = state.listSP[index].gia_mua * state.listSP[index].so_luong;
            } else {
                // Sản phẩm mới, thêm vào giỏ
                const c: ICart = {
                    id: sp.id,
                    ten_sp: sp.ten_sp,
                    gia_mua: sp.gia_km, // Giá đơn vị
                    gia_tong: sp.gia_km * quantity, // Giá tổng
                    hinh: sp.hinh,
                    so_luong: quantity,
                };
                state.listSP.push(c);
            }
            console.log("Đã thêm sản phẩm: ", current(state).listSP);
        },
        SuaSL: (state, param) => {
            const id: number = Number(param.payload[0]);
            const so_luong: number = Number(param.payload[1]);
            const index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1 && so_luong >= 1) {
                state.listSP[index].so_luong = so_luong;
                // Cập nhật giá tổng dựa trên gia_mua
                state.listSP[index].gia_tong = state.listSP[index].gia_mua * so_luong;
            }
            console.log("Đã sửa số lượng: ", current(state).listSP);
        },
        XoaSP: (state, param) => {
            const id: number = Number(param.payload);
            const index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) {
                state.listSP.splice(index, 1);
            }
            console.log(`Đã xóa sản phẩm có id: ${id}`);
        },
        XoaGH: (state) => {
            state.listSP = [];
            console.log('Đã xóa toàn bộ giỏ hàng');
        }
    }
});

export const { ThemSP, SuaSL, XoaSP, XoaGH } = cartSlice.actions;
export default cartSlice.reducer;