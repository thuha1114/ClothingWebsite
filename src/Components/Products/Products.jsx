import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { products as all_products } from '../../Components/Assets/products'; // Corrected alias name
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveAs } from 'file-saver';
import * as Yup from 'yup';
import empty from '../../../public/images/not_found.png'
import { FormProducts } from '../Form/FormProducts';
export const Products = () => {

    const [show, setShow] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState()
    const [products, setProducts] = useState(() => {
        const productStorage = JSON.parse(localStorage.getItem('updatedProducts'))
        return productStorage ? productStorage : all_products
    }); // Using correct alias name
    const [input, setInput] = useState('')
    const [category, setCategory] = useState('')
    const [showTable, setShowTable] = useState(true)
    const [filteredProducts, setFilteredProducts] = useState(all_products); 
    const [categoryForm, setCategoryForm] = useState(() => selectedProduct ? selectedProduct[0].category : '');
    const [subCategory, setSubCategory] = useState(() => selectedProduct ? selectedProduct[0].sub_category : '');
    const [status, setStatus] = useState(() => selectedProduct ? selectedProduct[0].status : '');
    const [addForm, setAddForm] = useState(false)

    const handleHide = () => {
        setShow(false)
    }

    const notify = () => {
        toast.success('Xóa sản phẩm thành công', {
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

    const notifyEdit = () => {
        toast.success('Sửa thông tin sản phẩm thành công', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'notifyEdit',
        });
    };

    const saveProductsToFile = (updatedProducts) => {
        localStorage.setItem('updatedProducts', JSON.stringify(updatedProducts));
        const data = `let products = ${JSON.stringify(updatedProducts, null, 2)};\n\nexport { products };`;
        const blob = new Blob([data], { type: 'text/javascript;charset=utf-8' });
        const productsFile = new File([blob], "products.js", { type: 'text/javascript;charset=utf-8' });
    
        saveAs(productsFile)
    };

    const handleDelete = (id) => {
        const result = all_products.filter(item => item.id !== id)
        setProducts(result)
        localStorage.setItem('updatedProducts', JSON.stringify(result));
        saveProductsToFile(result)
        notify()
    }

    useEffect(() => {
        const updatedProducts = JSON.parse(localStorage.getItem('updatedProducts'))
    
        console.log("Updated products:", updatedProducts);
        setShowTable(true)
    }, [products]);

    useEffect(()=>{
        if(input === '')
            setFilteredProducts(all_products)
        else{
            const result = all_products.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
            if(result.length === 0)
                setShowTable(false)
            else{
                setFilteredProducts(result)
                setShowTable(true)
            }
        }
    },[input])

    useEffect(() => {
        const filterProductsByCategory = (category) => {
            if (category === 'all' || category === '') {
                setFilteredProducts(all_products);
                setShowTable(true);
            } else {
                const sorted = all_products.filter(item => item.sub_category === category);
                if (sorted.length === 0) {
                    setShowTable(false);
                } else {
                    setFilteredProducts(sorted);
                    setShowTable(true);
                }
            }
        };
    
        filterProductsByCategory(category);
    }, [category]);

    // console.log("tất cả: ", products)
    // console.log("lọc sản phẩm: ", filteredProducts)

    const handleEdit = (id) => {
        const result = all_products.filter(item => item.id === id)
        setSelectedProduct(result)
        setShow(true)
    }

    return (
        <div>
            <div className='mt-10 relative pl-10 '>
                {/* Thanh tìm kiếm sản phẩm */}
                <div className='w-1/3 relative mb-5'>
                    <input  
                            className='border-2 w-full rounded-md border-slate-400 w-60 h-8 pl-8 text-sm font-normal border-sky-700 focus:outline-none'
                            placeholder='Nhập nội dung tìm kiếm ...'
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                        />
                    <i className="fa-solid fa-magnifying-glass cursor-pointer absolute right-2 top-2"></i>
                </div>
            
                <div className='uppercase font-bold border-l-4 border-red-500 pl-3 text-cyan-700 text-lg'>Danh sách sản phẩm</div>
                <div className='flex mt-5'>
                    <div 
                        className='bg-cyan-600 text-white font-bold w-48 py-2 cursor-pointer hover:opacity-90 text-center rounded-lg float-left'
                        onClick={() => setAddForm(true)}
                    >Thêm sản phẩm</div>
                    {/* Lọc theo danh mục */}
                    <div className='ml-36 border-slate-400 my-auto text-cyan-800 pt-5 float-right'>
                        <ul className='flex justify-between flex-1 mx-5 '>
                        <li className="hover:border-b-4 mx-5 hover:border-red-400 hover:transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer " onClick={() => setCategory('all')}>Tất cả</li>
                        <li className="hover:border-b-4 mx-5 hover:border-red-400 hover:transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('pants')}>Quần</li>
                        <li className="hover:border-b-4 mx-5 hover:border-red-400 hover:transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('sweater')}>Sweater</li>
                        <li className="hover:border-b-4 mx-5 hover:border-red-400 hover:transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('jacket')}>Áo khoác</li>
                        <li className="hover:border-b-4 mx-5 hover:border-red-400 hover:transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('pajamas')}>Đồ ngủ</li>
                        <li className="hover:border-b-4 mx-5 hover:border-red-400 hover:transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('shirt')}>Áo sơ mi</li>
                        <li className="hover:border-b-4 mx-5 hover:border-red-400 hover:transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('skirt')}>Váy</li>
                        <li className="hover:border-b-4 mx-5 hover:border-red-400 hover:transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('t-shirt')}>Áo thun</li>
                        </ul>
                    </div>

                </div>
                {/* Form thêm dữ liệu */}
                {addForm && (
                    <div className='fixed top-0 left-0 bg-slate-400 bg-opacity-70 w-full h-full'>
                        <i 
                            className="fa-solid fa-x top-5 left-3/4 ml-10 absolute text-xl cursor-pointer font-bold hover:opacity-80"
                            onClick={() => setAddForm(false)}
                        ></i>
                        <div className='flex justify-center items-center w-full h-full'>
                            <FormProducts />
                        </div>
                    </div>
                )}

                {/* Bảng dữ liệu */}
                {showTable ? (
                    <table className='mt-5 table-auto divide-y divide-gray-500 rounded-t-lg overflow-hidden rounded-b-lg mb-20 text-cyan-700 mr-5'>
                        <thead className='divide-x divide-gray-500 bg-cyan-600 text-gray-100' >
                            <tr className='h-12'>
                                <th className='px-12 w-2/12'>Thông tin sản phẩm</th>
                                <th className='w-3/12'>Hình ảnh sản phẩm</th>
                                <th className='w-2/12'>Mô tả</th>
                                <th className='w-1/12'>Tháo tác</th>
                            </tr>
                        </thead>
                        <tbody className=" divide-gray-300 bg-stone-100 ">
                            {filteredProducts.map(item => (
                                <tr key={item.key} className='divide-x divide-gray-500 border-b-2 border-slate-300'>
                                    
                                    {/* Thông tin sản phẩm */}
                                    <td>
                                        <div className='mx-5 py-5 '>
                                            <div><b>Tên sản phẩm:</b> {item.name}</div>
                                            <div><b>Thể loại:</b> {item.category}</div>
                                            <div><b>Danh mục: </b> {item.sub_category}</div>
                                            <div className='w-48'>
                                                <b>Giá cũ:</b> {item.old_price.toLocaleString('en-us')}
                                                <h1><b>Giá mới:</b> {item.new_price.toLocaleString('en-us')} </h1>
                                            </div>
                                        </div>
                                    </td>
                                    {/* Danh sách hình ảnh */}
                                    <td className='flex h-60 justify-center items-center'>
                                        {item.image.map( (item,index) => (
                                            <img key={index} src={item} className='w-24 h-32 my-5 mx-2 bg-white p-2 shadow-2xl rounded-lg' />
                                        ))}
                                    </td>
                                    {/* Mô tả sản phẩm */}
                                    <td className='h-full'>
                                        <h1 className=' overflow-y-auto h-48 px-5 text-justify' >{item.description}</h1>
                                    </td>
                                    {/* Thao tác */}
                                    <td className=''>
                                        <div className='h-48 flex justify-center items-center'>
                                            <i 
                                                className="fa-regular fa-trash-can cursor-pointer hover:opacity-80 text-xl pr-5"
                                                onClick={() => handleDelete(item.id)}></i>
                                            <i 
                                                className="fa-regular fa-pen-to-square cursor-pointer hover:opacity-80 text-xl"
                                                onClick={() => handleEdit(item.id)}></i>
                                        </div>
                                    </td>
                                </tr>

                            ))}
                            <ToastContainer toastId="notify"/>
                        </tbody>
                    </table>
                ) : (
                    <div className='flex justify-center items-center flex-col mt-10'>
                        <h1 className='text-red-500 font-bold text-lg'>Không tìm thấy sản phẩm!</h1>
                        <img src={empty} className='w-1/2' />
                    </div>
                )}
                            
                {/* Form sửa thông tin */}
                {show && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <i 
                            className="fa-solid fa-x top-5 left-3/4 ml-10 absolute text-xl cursor-pointer font-bold"
                            onClick={handleHide}
                        ></i>
                        <div className='w-1/2 bg-white py-10 rounded-xl overflow-auto h-5/6'>
                            <div className='text-center uppercase font-bold text-xl pb-7 text-cyan-500'>Form sửa thông tin sản phẩm</div>
                            <Formik
                                initialValues={{
                                    name: selectedProduct ? selectedProduct[0].name : '',
                                    category: selectedProduct ? selectedProduct[0].category : '',
                                    image: selectedProduct ? selectedProduct[0].image : '',
                                    new_price: selectedProduct ? selectedProduct[0].new_price : '',
                                    old_price: selectedProduct ? selectedProduct[0].old_price : '',
                                    description: selectedProduct ? selectedProduct[0].description : '',
                                    sub_category: selectedProduct ? selectedProduct[0].sub_category : '',
                                    status: selectedProduct ? selectedProduct[0].status : '',
                                }}
                                validationSchema={Yup.object({
                                    new_price: Yup.string().required('Trường này không được để trống!').matches(/^\d+$/, 'Không hợp lệ!'),
                                    old_price: Yup.string().required('Trường này không được để trống!').matches(/^\d+$/, 'Không hợp lệ!'),
                                })}
                                onSubmit= {(values, {setSubmitting}) => {                     
                                    
                                    const result = all_products.map(product => {
                                        if(product.id === selectedProduct[0].id){
                                            return{
                                                ...product,
                                                name:values.name, 
                                                category:categoryForm ? categoryForm : values.category, 
                                                new_price:values.new_price,
                                                old_price: values.old_price,
                                                sub_category: subCategory ? subCategory : values.sub_category,
                                                description: values.description,
                                                status: status ? status : values.status
                                            }
                                        }
                                        return product
                                    })
                                    saveProductsToFile(result)
                                    notifyEdit()
                                }}
                            >
                                <Form>
                                    {/* Tên sản phẩm */}
                                    <div className='flex mx-24 text-cyan-500 '>
                                        <b className='pt-2'>Tên sản phẩm: </b>
                                        <div className="border-2 rounded-lg ml-5 h-10 border-blue-200 w-4/6">
                                            <i className=" text-cyan-800 fa-solid fa-pen w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                            <Field type="text" name="name" placeholder="Tên sản phẩm ..." className='outline-none  pl-5 text-blue-400 font-semibold capitalize w-5/6' />
                                        </div>
                                    </div>

                                    {/* Thể loại */}
                                    <div className='flex mx-24 text-cyan-500 '>
                                        <b className='my-auto'>Thể loại: </b>
                                        <div className="border-2 rounded-lg ml-16 h-10 border-blue-200 mt-5 w-4/6">
                                            <i className="text-cyan-800 fa-solid fa-list w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                            <Field as="select" name="category" className='outline-none pl-5 text-blue-400 font-semibold capitalize w-5/6' value={categoryForm} 
                                                onChange = {(e) => setCategoryForm(e.target.value)}
                                            >
                                                <option value={selectedProduct[0].category}>{selectedProduct[0].category}</option>
                                                <option value="men">Sản phẩm nam</option>
                                                <option value="women">Sản phẩm nữ</option>
                                                <option value="kid">Sản phẩm trẻ em</option>
                                            </Field>
                                        </div>
                                    </div>
                                    {/* Danh mục */}
                                    <div className="mx-24 flex text-cyan-500">
                                        <b className='my-auto'>Danh mục: </b>
                                        <div className="border-2 rounded-lg ml-12 h-10 border-blue-200 mt-5 w-4/6">
                                            <i className="text-cyan-800 fa-solid fa-list w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                            <Field as="select" name="sub_category" className='outline-none pl-5 text-blue-400 font-semibold capitalize w-5/6' value={subCategory} 
                                                onChange = {(e) => setSubCategory(e.target.value)}
                                            >
                                                <option value={selectedProduct[0].sub_category}>{selectedProduct[0].sub_category}</option>
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
                                    {/* Giá */}
                                    <div className="flex mx-24 text-cyan-500 py-5">
                                        <b className='mt-2'>Giá: </b>
                                        <div className='flex mx-16 w-full pl-8'>
                                            {/* Giá cũ */}
                                            <div className="border-2 rounded-lg h-10 border-blue-200 mb-5">
                                                <i className=" text-cyan-800 fa-solid fa-money-bill w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                                <Field type="text" name="old_price"  placeholder="Giá cũ ..." className='outline-none pl-5 text-blue-400 font-semibold capitalize w-1/2' />
                                                <ErrorMessage name="old_price" component="div" className="text-red-500" />
                                            </div>
                                            {/* Giá mới */}
                                            <div className="border-2 rounded-lg  h-10 border-blue-200 ml-5  mb-5">
                                                <i className=" text-cyan-800 fa-solid fa-money-bill w-10 h-full  text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                                <Field type="text" name="new_price"  placeholder="Giá mới ..." className='outline-none pl-5 text-blue-400 font-semibold capitalize w-1/2'  />
                                                <ErrorMessage name="new_price" component="div" className="text-red-500" />
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

                                    {/* Trạng thái sản phẩm text-cyan-500*/}
                                    <div className="mx-24 flex text-cyan-500">
                                        <b className='mt-7'>Trạng thái: </b>
                                        <div className="border-2 rounded-lg ml-12 h-10 border-blue-200 mt-5 w-4/6">
                                            <i className="text-cyan-800 fa-solid fa-list w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                            <Field as="select" name="status" className='outline-none pl-5 text-blue-400 font-semibold capitalize w-5/6' value={status} 
                                                onChange = {(e) => setStatus(e.target.value)}
                                            >
                                                <option value={selectedProduct[0].status}>
                                                    {selectedProduct[0].status === 'best-seller' ? 'Sản phẩm bán chạy' : 'Bộ sưu tập mới'}
                                                </option>
                                                <option value="best-seller">Sản phẩm bán chạy</option>
                                                <option value="new-collection">Bộ sưu tập mới</option>
                                            </Field>
                                        </div>
                                    </div>                                    
                                    {/* Nút xác nhận */}
                                    <div className='w-full flex justify-center'>
                                        <button
                                            className='px-auto h-10 border-2 rounded-md text-center my-5 font-semibold text-lg cursor-pointer border-blue-200 bg-blue-600 text-white hover:opacity-90 w-full mx-24  '
                                            type="submit"
                                        >Xác nhận</button>

                                    </div>
                                </Form>

                            </Formik>
                            <ToastContainer toastId='notifyEdit' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
