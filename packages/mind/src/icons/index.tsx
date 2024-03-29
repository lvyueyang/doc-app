import {
  BiaoQingBishiIcon,
  BiaoQingBugaoxingIcon,
  BiaoQingDouyanIcon,
  BiaoQingGoutouIcon,
  BiaoQingHeixianIcon,
  BiaoQingHeshiIcon,
  BiaoQingJiayouIcon,
  BiaoQingKuIcon,
  BiaoQingKunIcon,
  BiaoQingShengqiIcon,
  BiaoQingWeixiaoIcon,
  BiaoQingXiaoIcon,
  BiaoQingXiaokuIcon,
  BiaoQingXihuanIcon,
  BiaoQingYunIcon,
  BiaoQingZanIcon,
  FuHaoAixinIcon,
  FuHaoAnzhuojiIcon,
  FuHaoBianjiIcon,
  FuHaoCaiIcon,
  FuHaoChahaoIcon,
  FuHaoDayinjiIcon,
  FuHaoDuihaoIcon,
  FuHaoFujianIcon,
  FuHaoHezuoIcon,
  FuHaoIPhoneIcon,
  FuHaoJiesuoIcon,
  FuHaoJingshiIcon,
  FuHaoLingganIcon,
  FuHaoQianbaoIcon,
  FuHaoRiliIcon,
  FuHaoShangzhangIcon,
  FuHaoShezhiIcon,
  FuHaoShijianIcon,
  FuHaoSuoIcon,
  FuHaoTishiIcon,
  FuHaoTuanduiIcon,
  FuHaoTubiaoIcon,
  FuHaoWenhaoIcon,
  FuHaoXiadieIcon,
  FuHaoYoujianIcon,
  FuHaoYuechiIcon,
  FuHaoZanIcon,
  FuHaoZhanghuIcon,
  JianTouShangIcon,
  JianTouShangxiaIcon,
  JianTouWubaibianIcon,
  JianTouXiaIcon,
  JianTouXunhuanIcon,
  JianTouYouIcon,
  JianTouZuoIcon,
  JianTouZuoyouIcon,
  JinDu1Icon,
  JinDu2Icon,
  JinDu3Icon,
  JinDu4Icon,
  JinDu5Icon,
  JinDu6Icon,
  JinDu7Icon,
  JinDu8Icon,
  QiZhi1Icon,
  QiZhi2Icon,
  QiZhi3Icon,
  QiZhi4Icon,
  QiZhi5Icon,
  QiZhi6Icon,
  QiZhi7Icon,
  QiZhi8Icon,
  XingXing1Icon,
  XingXing2Icon,
  XingXing3Icon,
  XingXing4Icon,
  XingXing5Icon,
  XingXing6Icon,
  XingXing7Icon,
  XingXing8Icon,
  YouXianJi10Icon,
  YouXianJi11Icon,
  YouXianJi12Icon,
  YouXianJi13Icon,
  YouXianJi14Icon,
  YouXianJi15Icon,
  YouXianJi16Icon,
  YouXianJi1Icon,
  YouXianJi2Icon,
  YouXianJi3Icon,
  YouXianJi4Icon,
  YouXianJi5Icon,
  YouXianJi6Icon,
  YouXianJi7Icon,
  YouXianJi8Icon,
  YouXianJi9Icon,
} from '@kangmi/icons';

export interface GroupItem {
  cname: string;
  name: string;
  /** 在节点中是否只能存在一个 */
  isOnly: boolean;
  icons: Array<{
    name: string;
    icon: JSX.Element;
  }>;
}

export const iconGroup: GroupItem[] = [
  transformIcons(
    [
      YouXianJi1Icon,
      YouXianJi2Icon,
      YouXianJi3Icon,
      YouXianJi4Icon,
      YouXianJi5Icon,
      YouXianJi6Icon,
      YouXianJi7Icon,
      YouXianJi8Icon,
      YouXianJi9Icon,
      YouXianJi10Icon,
      YouXianJi11Icon,
      YouXianJi12Icon,
      YouXianJi13Icon,
      YouXianJi14Icon,
      YouXianJi15Icon,
      YouXianJi16Icon,
    ],
    {
      cname: '优先级',
      name: 'youxianji',
    },
  ),
  transformIcons(
    [
      JinDu1Icon,
      JinDu2Icon,
      JinDu3Icon,
      JinDu4Icon,
      JinDu5Icon,
      JinDu6Icon,
      JinDu7Icon,
      JinDu8Icon,
    ],
    {
      cname: '进度',
      name: 'jindu',
    },
  ),
  transformIcons(
    [
      BiaoQingWeixiaoIcon,
      BiaoQingBugaoxingIcon,
      BiaoQingXiaokuIcon,
      BiaoQingXihuanIcon,
      BiaoQingXiaoIcon,
      BiaoQingShengqiIcon,
      BiaoQingKuIcon,
      BiaoQingHeixianIcon,
      BiaoQingKunIcon,
      BiaoQingDouyanIcon,
      BiaoQingYunIcon,
      BiaoQingGoutouIcon,
      BiaoQingHeshiIcon,
      BiaoQingZanIcon,
      BiaoQingJiayouIcon,
      BiaoQingBishiIcon,
    ],
    {
      cname: '表情',
      name: 'biaoqing',
    },
  ),
  transformIcons(
    [
      JianTouShangIcon,
      JianTouYouIcon,
      JianTouXiaIcon,
      JianTouZuoIcon,
      JianTouShangxiaIcon,
      JianTouZuoyouIcon,
      JianTouWubaibianIcon,
      JianTouXunhuanIcon,
    ],
    {
      cname: '箭头',
      name: 'jiantou',
    },
  ),
  transformIcons(
    [
      QiZhi1Icon,
      QiZhi2Icon,
      QiZhi3Icon,
      QiZhi4Icon,
      QiZhi5Icon,
      QiZhi6Icon,
      QiZhi7Icon,
      QiZhi8Icon,
    ],
    {
      cname: '旗帜',
      name: 'qizhi',
    },
  ),
  transformIcons(
    [
      XingXing1Icon,
      XingXing2Icon,
      XingXing3Icon,
      XingXing4Icon,
      XingXing5Icon,
      XingXing6Icon,
      XingXing7Icon,
      XingXing8Icon,
    ],
    {
      cname: '星星',
      name: 'xingxing',
    },
  ),
  transformIcons(
    [
      FuHaoDuihaoIcon,
      FuHaoChahaoIcon,
      FuHaoRiliIcon,
      FuHaoShijianIcon,
      FuHaoJingshiIcon,
      FuHaoTishiIcon,
      FuHaoWenhaoIcon,
      FuHaoLingganIcon,
      FuHaoTubiaoIcon,
      FuHaoTuanduiIcon,
      FuHaoSuoIcon,
      FuHaoJiesuoIcon,
      FuHaoYoujianIcon,
      FuHaoFujianIcon,
      FuHaoShezhiIcon,
      FuHaoZhanghuIcon,
      FuHaoIPhoneIcon,
      FuHaoAnzhuojiIcon,
      FuHaoZanIcon,
      FuHaoCaiIcon,
      FuHaoYuechiIcon,
      FuHaoAixinIcon,
      FuHaoHezuoIcon,
      FuHaoQianbaoIcon,
      FuHaoBianjiIcon,
      FuHaoDayinjiIcon,
      FuHaoXiadieIcon,
      FuHaoShangzhangIcon,
    ],
    {
      cname: '符号 (其他)',
      name: 'fuhao',
      isOnly: false,
    },
  ),
];

function transformIcons(
  icons: React.FC[],
  { name, cname, isOnly = true }: { name: string; cname: string; isOnly?: boolean },
) {
  return {
    cname,
    name,
    isOnly,
    icons: icons.map((Icon, ind) => {
      return {
        name: name + (ind + 1),
        icon: <Icon />,
      };
    }),
  };
}
