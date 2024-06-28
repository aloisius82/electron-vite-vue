import { DB_COMMAND, Product } from "..";
import { inError, inSuccess } from "./";

export default async (command: DB_COMMAND, parm: any) => {
  let res: any;
  console.log(parm);
  switch (command) {
    case DB_COMMAND.FIND:
      try {
        res = await Product.findAll();
        return inSuccess(res);
      } catch (error) {
        return inError(error);
      }
    case DB_COMMAND.CREATE:
      try {
        res = await Product.create(parm.data);
        return inSuccess({
          result: res,
          parm,
        });
      } catch (error) {
        return inError(error);
      }
      break;
    case DB_COMMAND.UPDATE:
      try {
        res = await Product.update(parm.data, {
          where: {
            id: parm.data.id,
          },
        });
        return inSuccess({
          result: res,
          parm,
        });
      } catch (error) {
        return inError(error);
      }
    case DB_COMMAND.DELETE:
      try {
        res = await Product.destroy({
          where: parm,
        });
        return inSuccess({
          result: res,
          parm,
        });
      } catch (error) {
        return inError(error);
      }
    default:
      return inError({ message: "command not found" });
      break;
  }
};
