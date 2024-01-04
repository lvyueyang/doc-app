import { type IApi } from 'umi';

export default (api: IApi) => {
  api.modifyHTML(($, { path }) => {
    $('html').attr('lang', 'zh-cn');
    return $;
  });
};
