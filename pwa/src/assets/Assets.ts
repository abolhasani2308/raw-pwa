//@ts-nocheck
import {
  customResponsiveHeight,
  customResponsiveFont,
  customResponsiveWidth,
} from '../utils/CustomResponsive';

//-----------import svg files
import parsian_bank_logo_1 from '../assets/images/parsian_bank_logo_1.svg';
import parsian_bank_logo_2 from '../assets/images/parsian_bank_logo_2.svg';
import circle_x_filled from '../assets/images/circle_x_filled.svg';
import user from '../assets/images/user.svg';
import device_mobile from '../assets/images/device_mobile.svg';
import call from '../assets/images/call.svg';
import help from '../assets/images/help.svg';
import fingerprint_1 from '../assets/images/fingerprint_1.svg';
import backspace_1 from '../assets/images/backspace_1.svg';
import fingerprint_2 from '../assets/images/fingerprint_2.svg';
import backspace_2 from '../assets/images/backspace_2.svg';
import father from '../assets/images/father.svg';
import birthday from '../assets/images/birthday.svg';
import home from '../assets/images/home.svg';
import cash_1 from '../assets/images/cash_1.svg';
import cash_2 from '../assets/images/cash_2.svg';
import step_out_1 from '../assets/images/step_out_1.svg';
import step_out_2 from '../assets/images/step_out_2.svg';
import transform_1 from '../assets/images/transform_1.svg';
import transform_2 from '../assets/images/transform_2.svg';
import profile_1 from '../assets/images/profile_1.svg';
import profile_2 from '../assets/images/profile_2.svg';
import copy from '../assets/images/copy.svg';
import refresh from '../assets/images/refresh.svg';
import deposit from '../assets/images/deposit.svg';
import scan from '../assets/images/scan.svg';
import cash_3 from '../assets/images/cash_3.svg';
import arrow_down from '../assets/images/arrow_down.svg';
import arrow_up from '../assets/images/arrow_up.svg';
import arrows from '../assets/images/arrows.svg';
import scanner from '../assets/images/scanner.svg';
import close_1 from '../assets/images/close_1.svg';
import share from '../assets/images/share.svg';
import pattern_1 from '../assets/images/pattern_1.svg';
import pattern_2 from '../assets/images/pattern_2.svg';
import pattern_3 from '../assets/images/pattern_3.svg';
import flash from '../assets/images/flash.svg';
import close_2 from '../assets/images/close_2.svg';
import circle from '../assets/images/circle.svg';
import arrow from '../assets/images/arrow.svg';
import secure from '../assets/images/secure.svg';
import un_secure from '../assets/images/un_secure.svg';
import password from '../assets/images/password.svg';

export default {
  //----------------------------------------png files
  images: {
    // pattern: require('./images/icon.png'),
  },
  //----------------------------------------svg files
  svg: {
    parsian_bank_logo_1,
    parsian_bank_logo_2,
    circle_x_filled,
    user,
    device_mobile,
    call,
    help,
    fingerprint_1,
    backspace_1,
    fingerprint_2,
    backspace_2,
    father,
    birthday,
    home,
    cash_1,
    cash_2,
    step_out_1,
    step_out_2,
    transform_1,
    transform_2,
    profile_1,
    profile_2,
    copy,
    refresh,
    deposit,
    scan,
    cash_3,
    arrow_down,
    arrow_up,
    arrows,
    scanner,
    close_1,
    share,
    pattern_1,
    pattern_2,
    pattern_3,
    flash,
    close_2,
    circle,
    arrow,
    secure,
    un_secure,
    password,
  },
  //----------------------------------------font style
  font: {
    bold: 'Vazirmatn-Bold', //fontWeight: 700
    medium: 'Vazirmatn-Medium', //fontWeight: 500
    regular: 'Vazirmatn-Regular', //fontWeight: 400
    light: 'Vazirmatn-Light', //fontWeight: 300

    h1: customResponsiveFont(2.8) * 1.6,
    h2: customResponsiveFont(2.4) * 1.6,
    h3: customResponsiveFont(2) * 1.6,
    h4: customResponsiveFont(1.8) * 1.6,
    h5: customResponsiveFont(1.6) * 1.6,
    h6: customResponsiveFont(1.4) * 1.6,

    sub_1: customResponsiveFont(1.2) * 1.6,
    sub_2: customResponsiveFont(1) * 1.6,
    sub_3: customResponsiveFont(0.8) * 1.6,
    sub_4: customResponsiveFont(0.7) * 1.6,

    line_height: customResponsiveFont(3.4),
  },
  //----------------------------------------common sizes
  size: {
    horizontal_1: customResponsiveWidth(8),
    horizontal_2: customResponsiveWidth(6),
    horizontal_3: customResponsiveWidth(4),
    horizontal_4: customResponsiveWidth(2),
    horizontal_5: customResponsiveWidth(12),

    vertical_1: customResponsiveHeight(4),
    vertical_2: customResponsiveHeight(3),
    vertical_3: customResponsiveHeight(2),
    vertical_4: customResponsiveHeight(1),
    vertical_5: customResponsiveHeight(0.5),

    icon_1: customResponsiveHeight(3.6),
    icon_2: customResponsiveHeight(2.8),
    icon_3: customResponsiveHeight(4.6),

    line: customResponsiveHeight(0.2),

    header_large: customResponsiveHeight(10),
    header_small: customResponsiveHeight(8),

    bottom_tab: customResponsiveHeight(10),

    border_1: customResponsiveHeight(2),
    border_2: customResponsiveHeight(1),
    border_3: customResponsiveHeight(0.2),
    border_4: customResponsiveHeight(3),

    input_1: customResponsiveHeight(8.5),
    input_2: customResponsiveHeight(7.5),
    input_3: customResponsiveHeight(6.5),

    input_multi_line: customResponsiveHeight(21),

    button_1: customResponsiveHeight(8),
    button_2: customResponsiveHeight(7),
    button_3: customResponsiveHeight(6),

    fab: customResponsiveHeight(7),

    active_opacity: 0.7,

    elevation_1: customResponsiveHeight(0.2),
    elevation_2: customResponsiveHeight(1),

    icon_button_margin_padding: customResponsiveHeight(1),

    indicator_1: customResponsiveHeight(2.6),

    first_item_position_1: customResponsiveHeight(24),
    first_item_position_2: customResponsiveHeight(20),

    circle_1: customResponsiveHeight(7),

    fix_input: customResponsiveHeight(0.6),

    modal_background_opacity: 0.3,
    modal_max_height: customResponsiveHeight(90),
    modal_width: customResponsiveWidth(80),
  },
};
