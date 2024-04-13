import LabRequest from '../models/labrequest.js';

export const search = async (params = {}) => {
   const labRequestList =  await LabRequest.find(params).exec();
   return labRequestList;
}

export const save = async (labRequestData) => {
   const labRequest = new LabRequest(labRequestData);
   return await labRequest.save();
}

export const get = async (requestId) => {
   const labRequestData = await LabRequest.findOne({requestId: requestId}).exec();
   return labRequestData;
}

export const deleteLabRequest = async (requestId) => {
   const deletedLabRequest = await LabRequest.deleteOne({requestId:requestId});
   return deletedLabRequest;
}

export const update = async (labRequest) => {
   const updatedLabRequest = await LabRequest.updateOne({ requestId: labRequest.requestId }, labRequest).exec();
   return updatedLabRequest;
}



export const deleteAllLabReq = async () => {
   return await LabRequest.deleteMany({});
};

export const filter = async (patientId, labId) => {
   try {
       const query = {};
       if (patientId) query.patientId = patientId;
       if (labId) query.labId = labId;

       const labRequests = await LabRequest.find(query).exec();
       return labRequests;
   } catch (error) {
       console.error("Failed to filter lab requests:", error);
       throw new Error('Error filtering lab requests', { cause: error });
   }
};
