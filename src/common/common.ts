import mongoose from 'mongoose';
import { CustomValidator } from 'joi';

export const objectIdValidator: CustomValidator = (id, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return helpers.message({
      custom: `Id is not valid`
    });
  } else {
    return id;
  }
};
