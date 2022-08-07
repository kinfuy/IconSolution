import { resolve } from "path";
import { RESPONSE_CODE } from "../../libs/enum";
import { SourceService } from "../../database/services";
import type Koa from "koa";

const UPLOAD_FILE_DEFAULT_PATH = "source/temp";
export const uploadfile = async (ctx: Koa.Context) => {
  if (!ctx.request.files) {
    ctx.body = {
      code: RESPONSE_CODE.ERROR_PARAM,
      message: "文件找不到",
    };
    return;
  }
  if (!ctx.request.files.file) {
    ctx.body = {
      code: RESPONSE_CODE.ERROR_PARAM,
      message: "文件找不到",
    };
    return;
  }
  if (Array.isArray(ctx.request.files.file)) {
    ctx.body = {
      code: RESPONSE_CODE.ERROR_PARAM,
      message: "暂不支持多文件",
    };
    return;
  }

  const { size, originalFilename, newFilename, mimetype } =
    ctx.request.files.file;

  const scoure = new SourceService();
  try {
    await scoure.save({
      path: `${UPLOAD_FILE_DEFAULT_PATH}/${newFilename}`,
      originName: originalFilename,
      size,
      name: newFilename,
      type: mimetype,
    });
    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      data: {
        name: originalFilename,
        url: `${UPLOAD_FILE_DEFAULT_PATH}/${newFilename}`,
      },
      message: "文件上传成功",
    };
  } catch (error) {
    console.log("log=>index=>43:error:%o", error);
    ctx.body = {
      code: RESPONSE_CODE.ERROR_FAIL,
      message: "文件上传失败",
    };
  }
};
