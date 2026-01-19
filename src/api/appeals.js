import data from "../data/data.json";

// имитация запросов

export const fetchAppeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return data;
};

export const fetchAppealById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const appeal = data.find((item) => item.id === id);
  if (!appeal) {
    throw new Error(`Appeal with ID ${id} not found`);
  }
  return appeal;
};

export const fetchAppealsWithFilters = async ({
  status,
  search,
  page = 1,
  pageSize = 10,
}) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filteredData = [...data];

  if (status && status !== "all") {
    filteredData = filteredData.filter((item) => item.status === status);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        item.category.toLowerCase().includes(searchLower) ||
        item.address.toLowerCase().includes(searchLower),
    );
  }

  const total = filteredData.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedData,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};


export const fetchCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const categories = [...new Set(data.map((item) => item.category))];
  return categories;
};

export const fetchStatistics = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const total = data.length;
  const inProgress = data.filter((item) => item.status === "В работе").length;
  const resolved = data.filter((item) => item.status === "Решено").length;
  const rejected = data.filter((item) => item.status === "Отклонено").length;

  return {
    total,
    inProgress,
    resolved,
    rejected,
  };
};
