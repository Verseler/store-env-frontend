import axios from '@/api/axiosConfig';

export const getProjectsData = async () => await axios.get("/projects")
  .then(res => res.data)
  .catch(error => error);

export const addProjectData = async () => await axios.post("/projects")
  .then(res => res.data)
  .catch(error => error);

export const deleteProjectData = async () => await axios.delete("/projects")
  .then(res => res.data)
  .catch(error => error);