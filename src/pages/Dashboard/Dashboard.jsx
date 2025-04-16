import React, { useEffect, useState } from 'react'
import { useUserAuth } from "../../hooks/useUserAuth"
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import DashboardLayout from "../../components/Layouts/DashboardLayout"
import InfoCard from "../../components/Cards/InfoCard"
import { LuWalletMinimal, LuHandCoins } from 'react-icons/lu';
import {IoMdCard} from "react-icons/io";
import RecentTransactions from "../../components/Dashboard/RecentTransactions"
import FinanceOverview from "../../components/Dashboard/FinanceOverview"
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions"
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses"
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart"
import RecentIncome from "../../components/Dashboard/RecentIncome"


const Dashboard = () => {

  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

      if(response.data)
      {
        setDashboardData(response.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Something went wrong", error);
    }
  }

  useEffect(() => {
    fetchDashboardData();
    return() => {};
  }, [])

  return (
    <DashboardLayout activeMenu="Tổng quan thu chi">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard 
            icon={<IoMdCard/>}
            label="Số dư"
            value={dashboardData?.totalBalance || 0}
            color="bg-primary"
          />

          <InfoCard 
            icon={<LuWalletMinimal/>}
            label="Tổng thu"
            value={dashboardData?.totalIncome || 0}
            color="bg-orange-500"
          />

          <InfoCard 
            icon={<LuHandCoins/>}
            label="Tổng chi"
            value={dashboardData?.totalExpense || 0}
            color="bg-red-500"
          />
        </div>

        <div className='grid gird-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview 
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses 
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions || []}
            totalIncome={dashboardData?.last60DaysIncome?.total || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          /> 

        </div>
        

      </div>
    </DashboardLayout>
  )
}

export default Dashboard