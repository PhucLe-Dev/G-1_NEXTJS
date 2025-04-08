import { Sequelize, DataTypes, Model } from "sequelize";
import mysql2 from 'mysql2'; // Needed to fix sequelize issues with WebPack
const sequelize = new Sequelize(
    {
        database: 'server_laptop', username: 'root', password: '',
        host: 'localhost', dialect: 'mysql', dialectModule: mysql2, // fix sequelize with WebPack
    })
interface iTinTuc extends Model<number, string> {
    id: number; 
    tieu_de: string; 
    slug: string; 
    mo_ta: string; 
    ngay: string;
    noi_dung: string; 
    luot_xem: number; 
    id_loai: number;
    hinh: string;
}
export const TinTucModel = sequelize.define<iTinTuc>('tin_tuc', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tieu_de: { type: DataTypes.STRING },
    hinh: {type: DataTypes.STRING},
    mo_ta: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    ngay: { type: DataTypes.DATE },
    noi_dung: { type: DataTypes.TEXT },
    id_loai: { type: DataTypes.INTEGER },
    luot_xem: { type: DataTypes.NUMBER }
},
    { timestamps: false, tableName: "tin_tuc" }
);