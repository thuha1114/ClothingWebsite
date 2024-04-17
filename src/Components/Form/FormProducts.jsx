import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { products as all_products } from '../Assets/products';
import { saveAs } from 'file-saver';
import { toast, ToastContainer } from 'react-toastify';

export const FormProducts = () => {

    const [selectedImages, setSelectedImages] = useState([]);
    const [updatedProducts, setUpdatedProducts] = useState(all_products);

    // Xử lý sự kiện khi chọn ảnh
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Chuyển đổi FileList thành mảng
        const images = files.map((file) => URL.createObjectURL(file)); // Tạo URL cho từng tệp
        setSelectedImages((prevImages) => [...prevImages, ...images]); // Thêm ảnh vào danh sách đã chọn
    };

    // Xử lý sự kiện khi nhấp vào nút xóa ảnh
    const handleRemoveImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Loại bỏ ảnh khỏi danh sách
    };

    const saveProductsToFile = (updatedProducts) => {
        localStorage.setItem('updatedProducts', JSON.stringify(updatedProducts));
        const data = `let products = ${JSON.stringify(updatedProducts, null, 2)};\n\nexport { products };`;
        const blob = new Blob([data], { type: 'text/javascript;charset=utf-8' });
        const productsFile = new File([blob], "products.js", { type: 'text/javascript;charset=utf-8' });
    
        saveAs(productsFile)
    };    

    const notify = () => {
        toast.success('Thêm sản phẩm thành công!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'notify',
        });
    };

    console.log('sản phẩm được chọn là: ', selectedImages)
    console.log('length? ', selectedImages.length)

    // useEffect(() => {
    //     setFieldValue('image', selectedImages); // Cập nhật giá trị của trường image trong formik
    // }, [selectedImages]);
    
    return (
        <div className='bg-white rounded-xl py-5 w-1/2 overflow-y-auto h-5/6'>
            <div className='text-center uppercase font-bold text-xl pb-7 text-cyan-500'>Form thêm sản phẩm</div>
            <Formik
                initialValues={{
                    name: '',
                    category: '',
                    image: selectedImages,
                    new_price: '',
                    old_price: '',
                    description: '',
                    sub_category: '',
                    status: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Trường này không được để trống!'),
                    category: Yup.string().required('Trường này không được để trống!'),
                    sub_category: Yup.string().required('Trường này không được để trống!'),
                    status: Yup.string().required('Trường này không được để trống!'),
                    new_price: Yup.string().required('Trường này không được để trống!').matches(/^\d+$/, 'Không hợp lệ!'),
                    old_price: Yup.string().required('Trường này không được để trống!').matches(/^\d+$/, 'Không hợp lệ!'),
                    description: Yup.string().required('Trường này không được để trống!'),
                    
                })}
                onSubmit= {(values, {setSubmitting, setFieldValue }) => {         
                    const result = {
                        id: all_products[all_products.length-1].id + 1,
                        name: values.name,
                        category: values.category,
                        image: selectedImages,
                        old_price: values.old_price,
                        new_price: values.new_price,
                        sub_category: values.sub_category,
                        description: values.description,
                        status: values.status,
            
                    }
                    saveProductsToFile([...all_products, result])
                    notify()
                }}
            >
                <Form>
                    {/* Tên sản phẩm */}
                    <div className='flex mx-24 text-cyan-500 '>
                        <b className='pt-2'>Tên sản phẩm: </b>
                        <div className="border-2 rounded-lg ml-5 h-10 border-blue-200 w-4/6">
                            <i className=" text-cyan-800 fa-solid fa-pen w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                            <Field type="text" name="name" placeholder="Tên sản phẩm ..." className='outline-none  pl-5 text-blue-400 font-semibold capitalize w-5/6' />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                        </div>
                    </div>

                    {/* Thể loại */}
                    <div className='flex mx-24 text-cyan-500 '>
                        <b className='my-auto'>Thể loại: </b>
                        <div className="border-2 rounded-lg ml-16 h-10 border-blue-200 mt-5 w-4/6">
                            <i className="text-cyan-800 fa-solid fa-list w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                            <Field as="select" name="category" className='outline-none pl-5 text-blue-400 font-semibold capitalize w-5/6' >
                                <option value="men">Sản phẩm nam</option>
                                <option value="women">Sản phẩm nữ</option>
                                <option value="kid">Sản phẩm trẻ em</option>
                            </Field>
                        </div>
                    </div>
                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm text-center" />

                    {/* Danh mục */}
                    <div className="mx-24 flex text-cyan-500">
                        <b className='my-auto'>Danh mục: </b>
                        <div className="border-2 rounded-lg ml-12 h-10 border-blue-200 mt-5 w-4/6">
                            <i className="text-cyan-800 fa-solid fa-list w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                            <Field as="select" name="sub_category" className='outline-none pl-5 text-blue-400 font-semibold capitalize w-5/6' >
                                <option value="pants">Quần</option>
                                <option value="sweater">Sweater</option>
                                <option value="jacket">Áo khoác</option>
                                <option value="pajamas">Đồ ngủ</option>
                                <option value="shirt">Áo sơ mi</option>
                                <option value="skirt">Váy</option>
                                <option value="t-shirt">Áo thun</option>
                            </Field>
                        </div>
                    </div>
                    <ErrorMessage name="sub_category" component="div" className="text-red-500 text-sm text-center" />

                    {/* Ảnh */}
                    <div className="mx-24 flex text-cyan-500">
                        <b className='my-auto'>Ảnh: </b>
                        <div className="border-2 rounded-lg ml-24 h-10 border-blue-200 mt-5 w-4/6">
                            <label htmlFor="imageUpload" className="cursor-pointer">
                                <i className="text-cyan-800 fa-solid fa-upload w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <b className='pl-5 text-blue-400 font-semibold'> Chọn ảnh </b>
                            </label>
                            <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        {selectedImages.map((image, index) => (
                            <div key={index} className='relative'>
                                <img src={image} alt={`Selected ${index}`} style={{ width: '100px', height: 'auto', marginRight: '10px' }} className='w-24 h-32 my-5 mx-2 bg-white p-2 shadow-2xl rounded-lg' />
                                <i 
                                    className="fa-solid fa-xmark cursor-pointer hover:opacity-80 absolute left-0 top-5"
                                    onClick={() => handleRemoveImage(index)}
                                ></i>
                            </div>
                        ))}
                    </div>
                    <ErrorMessage name="image" component="div" className="text-red-500 text-sm text-center" />

                    {/* Giá */}
                    <div className="flex mx-24 text-cyan-500 py-5">
                        <b className='mt-2'>Giá: </b>
                        <div className='flex mx-16 w-full pl-8'>
                            {/* Giá cũ */}
                            <div className="border-2 rounded-lg h-10 border-blue-200 mb-5">
                                <i className=" text-cyan-800 fa-solid fa-money-bill w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="text" name="old_price"  placeholder="Giá cũ ..." className='outline-none pl-5 text-blue-400 font-semibold capitalize w-1/2' />
                                <ErrorMessage name="old_price" component="div" className="text-red-500 text-sm" />
                            </div>
                            {/* Giá mới */}
                            <div className="border-2 rounded-lg  h-10 border-blue-200 ml-5  mb-5">
                                <i className=" text-cyan-800 fa-solid fa-money-bill w-10 h-full  text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="text" name="new_price"  placeholder="Giá mới ..." className='outline-none pl-5 text-blue-400 font-semibold capitalize w-1/2'  />
                                <ErrorMessage name="new_price" component="div" className="text-red-500 text-sm" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Mô tả sản phẩm */}
                    <div className="flex mx-24 text-cyan-500">
                        <b className='my-auto'>Mô tả: </b>
                        <div className="border-2 rounded-lg ml-20 w-4/6 mb-5 h-32 flex justify-center">
                            <i className=" text-cyan-800 fa-solid fa-pen w-10 h-32  items-center my-auto align-middle text-xl pt-10 text-center border-r-2 border-blue-200 opacity-70 align-middle"></i>
                            <Field component="textarea" rows="5" cols="5" name="description" placeholder="Mô tả sản phẩm ..." className='outline-none w-full pl-5 text-blue-400 font-semibold w-[330px]' />
                        </div>
                    </div>
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm text-center" />

                    {/* Trạng thái sản phẩm text-cyan-500*/}
                    <div className="mx-24 flex text-cyan-500">
                        <b className='mt-7'>Trạng thái: </b>
                        <div className="border-2 rounded-lg ml-12 h-10 border-blue-200 mt-5 w-4/6">
                            <i className="text-cyan-800 fa-solid fa-list w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                            <Field as="select" name="status" className='outline-none pl-5 text-blue-400 font-semibold capitalize w-5/6' >
                                <option value="best-seller">Sản phẩm bán chạy</option>
                                <option value="new-collection">Bộ sưu tập mới</option>
                            </Field>
                        </div>
                    </div>       
                    <ErrorMessage name="status" component="div" className="text-red-500 text-sm text-center" />

                    {/* Nút xác nhận */}
                    <div className='w-full flex justify-center'>
                        <button
                            className='px-auto h-10 border-2 rounded-md text-center my-5 font-semibold text-lg cursor-pointer border-blue-200 bg-blue-600 text-white hover:opacity-90 w-full mx-24  '
                            type="submit"
                        >Xác nhận</button>

                    </div>
                </Form>

            </Formik>
            <ToastContainer />
        </div>
    )
}
