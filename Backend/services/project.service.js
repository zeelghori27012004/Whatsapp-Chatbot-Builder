import projectModel from '../models/project.model.js';
import mongoose from 'mongoose';

export const createProject = async ({
    name, userId
}) => {
    if (!name) {
        throw new Error('Name is required')
    }
    if (!userId) {
        throw new Error('UserId is required')
    }

    let project;
    try {
        project = await projectModel.create({
            name,
            users: [ userId ]
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already exists');
        }
        throw error;
    }

    return project;

}

export const getAllProjectByUserId = async ({ userId }) => {
    if (!userId) {
        throw new Error('UserId is required')
    }

    const allUserProjects = await projectModel.find({
        users: userId
    })

    return allUserProjects
}


export const addUsersToProject = async ({ projectId, users, userId }) => {

    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    if (!users) {
        throw new Error("users are required")
    }

    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid userId(s) in users array")
    }

    if (!userId) {
        throw new Error("userId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId")
    }


    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    })

    console.log(project)

    if (!project) {
        throw new Error("User not belong to this project")
    }

    const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject



}

export const getProjectById = async ({ projectId }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    const project = await projectModel.findOne({
        _id: projectId
    }).populate('users')

    return project;
}


export const deleteProjectById = async ({ projectId, userId }) => {
    if (!projectId) {
        throw new Error("projectId is required");
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId");
    }

    if (!userId) {
        throw new Error("userId is required");
    }

    const project = await projectModel.findOne({ _id: projectId });

    if (!project) {
        throw new Error("Project not found");
    }

    // Optional: Only allow deletion if the user is part of the project
    const isUserInProject = project.users.includes(userId);
    if (!isUserInProject) {
        throw new Error("User does not have permission to delete this project");
    }

    await projectModel.deleteOne({ _id: projectId });

    return { message: "Project deleted successfully" };
}


export const updateProjectFlow = async ({ projectId, fileTree }) => {
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }

  const project = await projectModel.findById(projectId);
  if (!project) {
    throw new Error("Project not found");
  }

  project.fileTree = fileTree;
  return await project.save();
};


export const updateProjectName = async ({ projectId, name, userId }) => {
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }

  if (!name || typeof name !== 'string') {
    throw new Error("Project name must be a valid string");
  }

  const project = await projectModel.findOne({ _id: projectId });

  if (!project) {
    throw new Error("Project not found");
  }

  if (!project.users.includes(userId)) {
    throw new Error("User does not have permission to update this project");
  }

  project.name = name.toLowerCase().trim();

  try {
    return await project.save();
  } catch (err) {
    if (err.code === 11000) {
      throw new Error("Project name already exists");
    }
    throw err;
  }
};
