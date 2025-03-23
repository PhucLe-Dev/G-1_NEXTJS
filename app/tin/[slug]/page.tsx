import { TinTucModel } from '@/app/database';
import { redirect } from 'next/navigation';

export default async function ChiTietTin({ params }: { params: { slug: string } }) {
    const slug = params.slug
    console.log("slug: ", slug);
    
    const tin = await TinTucModel.findOne({ where: { slug } })
    if (tin == null) redirect("/")

    return (
        <div className='m-3 leading-8 text-justify'>
            <h1 className='text-xl bg-[#fe6532] text-white p-2'>{tin.tieu_de}</h1>
            <h3 className='bold text-lg leading-10'>{tin.mo_ta}</h3>
            <hr/>
            <p className='italic text-lg text-right my-3'>
                Cập nhật: {new Date(tin.ngay).toLocaleDateString("vi")}.
                Lượt xem: {tin.luot_xem}
            </p>
            <div className='text-base' dangerouslySetInnerHTML={{ __html: tin.noi_dung }} />
        </div>
    )
}
