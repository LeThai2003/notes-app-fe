import React, { useEffect, useState } from 'react'
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import DashboardLayout from "../../components/Layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import ExpenseList from "../../components/Expense/ExpenseList";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import DeleteAlert from "../../components/DeleteAlert";
import Modal from "../../components/Modal";

const Expense = () => {

  useUserAuth();
  
  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: {id: null, date: null, title: null}
  });

  const fetchExpenseDetails = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);

      if(response.data)
      {
        setExpenseData(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Something went wrong " + error);
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const {category, icon, amount, date} = expense;

    if(!category.trim())
    {
      toast.error("Khoản chi không được để trống");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) < 0)
    {
      toast.error("Số tiền không hợp lệ");
      return;
    }

    if(!date)
    {
      toast.error("Ngày chi không được để trống");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        icon,
        date
      });

      setOpenAddExpenseModal(false);
      toast.success("Thêm khoản chi thành công");
      fetchExpenseDetails();

    } catch (error) {
      console.error("Something went wrong: " + error);
    }

  }

  const deleteExpense = async (data) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(data.id));
      setOpenDeleteAlert({show: false, data: {id: null, date: null, title: null}});
      toast.success("Xóa khoản chi thành công");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Something went wrong: " + error);
    }
  }

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_detail.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Tải xuống chi tiết khoản tiêu thành công!");
    } catch (error) {
      console.error("Error download expense details: " + error);
      toast.error("Tải xuống chi tiết khoản tiêu thất bại, vui lòng thử lại sau!");
    }
  }

  useEffect(() => {
  
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Chi tiêu">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(data) => {
              setOpenDeleteAlert({show: true, data: data});
            }}
            onDownload={handleDownloadExpenseDetails}
          />

        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Thêm chi tiêu"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>

        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: {id: null, date: null, title: null}})}
          title="Xóa khoản chi"
        >
          <DeleteAlert
            content={<>Bạn có muốn xóa khoản chi <strong>"{openDeleteAlert.data?.title}"</strong> vào ngày <strong>{openDeleteAlert.data?.date}</strong></>}
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>

      </div>
    </DashboardLayout>
  )
}

export default Expense