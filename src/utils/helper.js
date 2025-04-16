import moment from "moment"

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const validateName = (name) => {
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    return regex.test(name);
}

export const validateOTP = (otp) => {
    const regex = /^[0-9]{8}$/;
    return regex.test(otp);
}


export const getNameInitials = (name) => {
    if(!name) return "";

    let words = name.split(" ");
    let initials = "";

    if(words.length > 2)
    {
        words = words.slice(words.length - 2, words.length);

    }
    
    for(let i = 0; i < words.length; i++)
    {
        initials += words[i][0];
    }

    return initials.toLocaleUpperCase(); 
}


export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    "Tiền": item?.amount,
    "Loại": item?.category
  }))

  return chartData
}

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("DD-MM"),
    "Tiền": item?.amount,
    "Nguồn": item?.source
  }));

  return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("DD-MM"),
    "Tiền": item?.amount,
    "Loại": item?.category
  }));

  return chartData;
}