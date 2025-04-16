import React, { useEffect, useState } from 'react'
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import DashboardLayout from "../../components/Layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import IncomeOverview from "../../components/Income/IncomeOverview";
import IncomeList from "../../components/Income/IncomeList";
import AddInComeForm from "../../components/Income/AddInComeForm";
import DeleteAlert from "../../components/DeleteAlert";
import Modal from "../../components/Modal";



const Income = () => {

  useUserAuth();
  
  const [loading, setLoading] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });

  const fetchIncomeDetails = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_IMCOME);

      if(response.data)
      {
        setIncomeData(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Something went wrong " + error);
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const {source, icon, amount, date} = income;

    if(!source.trim())
    {
      toast.error("Nguồn thu không được để trống");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) < 0)
    {
      toast.error("Số tiền không hợp lệ");
      return;
    }

    if(!date)
    {
      toast.error("Ngày thêm không được để trống");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        icon,
        date
      });

      setOpenAddIncomeModal(false);
      toast.success("Thêm khoản thu thành công");
      fetchIncomeDetails();

    } catch (error) {
      console.error("Something went wrong: " + error);
    }

  }
  
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Xóa khoản thu thành công");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Something went wrong: " + error);
    }
  }
  
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_detail.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error download income details: " + error);
      toast.error("Tải xuống chi tiết khoản thu thất bại, vui lòng thử lại sau!");
    }
  }
  
  useEffect(() => {

    fetchIncomeDetails();

    return () => {};
  }, []);


  return (
    <DashboardLayout activeMenu="Thu nhập">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({show: true, data: id});
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Thêm khoản thu"
        >
          <AddInComeForm onAddIncome={handleAddIncome}/>
        </Modal>

        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Xóa khoản thu"
        >
          <DeleteAlert
            content="Bạn có chắc muốn xóa khoản thu này?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income