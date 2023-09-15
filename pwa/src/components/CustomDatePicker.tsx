//@ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import persianDate from 'persian-date';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {CustomDatePickerPropsType} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {fa} from '../i18n/fa-IR';
import {customResponsiveHeight} from '../utils/CustomResponsive';
import CustomButton from './CustomButton';
import ScrollPicker from './ScrollPicker';

const CustomDatePicker = (props: CustomDatePickerPropsType) => {
  const years = [
    '1270',
    '1271',
    '1272',
    '1273',
    '1274',
    '1275',
    '1276',
    '1277',
    '1278',
    '1279',

    '1280',
    '1281',
    '1282',
    '1283',
    '1284',
    '1285',
    '1286',
    '1287',
    '1288',
    '1289',

    '1290',
    '1291',
    '1292',
    '1293',
    '1294',
    '1295',
    '1296',
    '1297',
    '1298',
    '1299',

    '1300',
    '1301',
    '1302',
    '1303',
    '1304',
    '1305',
    '1306',
    '1307',
    '1308',
    '1309',

    '1310',
    '1311',
    '1312',
    '1313',
    '1314',
    '1315',
    '1316',
    '1317',
    '1318',
    '1319',

    '1320',
    '1321',
    '1322',
    '1323',
    '1324',
    '1325',
    '1326',
    '1327',
    '1328',
    '1329',

    '1330',
    '1331',
    '1332',
    '1333',
    '1334',
    '1335',
    '1336',
    '1337',
    '1338',
    '1339',

    '1340',
    '1341',
    '1342',
    '1343',
    '1344',
    '1345',
    '1346',
    '1347',
    '1348',
    '1349',

    '1350',
    '1351',
    '1352',
    '1353',
    '1354',
    '1355',
    '1356',
    '1357',
    '1358',
    '1359',

    '1360',
    '1361',
    '1362',
    '1363',
    '1364',
    '1365',
    '1366',
    '1367',
    '1368',
    '1369',

    '1370',
    '1371',
    '1372',
    '1373',
    '1374',
    '1375',
    '1376',
    '1377',
    '1378',
    '1379',

    '1380',
    '1381',
    '1382',
    '1383',
    '1384',
    '1385',
    '1386',
    '1387',
    '1388',
    '1389',

    '1390',
    '1391',
    '1392',
    '1393',
    '1394',
    '1395',
    '1396',
    '1397',
    '1398',
    '1399',

    '1400',
    '1401',
    '1402',
    '1403',
    '1404',
    '1405',
    '1406',
    '1407',
    '1408',
    '1409',

    '1410',
    '1411',
    '1412',
    '1413',
    '1414',
    '1415',
    '1416',
    '1417',
    '1418',
    '1419',

    '1420',
    '1421',
    '1422',
    '1423',
    '1424',
    '1425',
    '1426',
    '1427',
    '1428',
    '1429',

    '1430',
    '1431',
    '1432',
    '1433',
    '1434',
    '1435',
    '1436',
    '1437',
    '1438',
    '1439',

    '1440',
  ];

  const months = [
    fa.components.date_picker.farvardin,
    fa.components.date_picker.ordibehesht,
    fa.components.date_picker.khordad,
    fa.components.date_picker.tir,
    fa.components.date_picker.mordad,
    fa.components.date_picker.shahrivar,
    fa.components.date_picker.mehr,
    fa.components.date_picker.aban,
    fa.components.date_picker.azar,
    fa.components.date_picker.dey,
    fa.components.date_picker.bahman,
    fa.components.date_picker.esfand,
  ];

  const days = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];

  const [initial_year_index, set_initial_year_index] = useState(132);
  const [initial_month_index, set_initial_month_index] = useState(1);
  const [initial_day_index, set_initial_day_index] = useState(1);

  var selectedYear: string;
  var selectedMonth: string;
  var selectedDay: string;

  useEffect(() => {
    if (props.initial_value?.day) {
      set_initial_year_index(Number(props.initial_value?.year) - 1270);
      set_initial_month_index(Number(props.initial_value?.month) - 1);
      set_initial_day_index(Number(props.initial_value?.day) - 1);
      selectedYear = props.initial_value?.year;
      selectedMonth = props.initial_value?.month;
      selectedDay = props.initial_value?.day;
    } else {
      persianDate.toLocale('en');
      let date = new persianDate().format();
      let now = {
        day: date.split('-')?.[2].split(' ')?.[0],
        month: date.split('-')?.[1],
        year: date.split('-')?.[0],
      };
      set_initial_year_index(Number(now.year) - 1270);
      set_initial_month_index(Number(now.month) - 1);
      set_initial_day_index(Number(now.day) - 1);
      selectedYear = now.year;
      selectedMonth = now.month;
      selectedDay = now.day;
    }
  }, [props.initial_value]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.background} onTouchStart={props.onRequestClose} />
      <View style={styles.modal}>
        <View style={styles.container}>
          <ScrollPicker
            dataSource={years}
            wrapperHeight={customResponsiveHeight(24)}
            wrapperWidth={responsiveScreenWidth(100)}
            wrapperBackground={Colors.bg}
            itemHeight={customResponsiveHeight(8)}
            highlightColor={Colors.primary}
            highlightBorderWidth={Assets.size.line}
            selectedIndex={initial_year_index}
            onValueChange={data => {
              selectedYear = data;
            }}
          />
          <ScrollPicker
            dataSource={months}
            wrapperHeight={customResponsiveHeight(24)}
            wrapperWidth={responsiveScreenWidth(100)}
            wrapperBackground={Colors.bg}
            itemHeight={customResponsiveHeight(8)}
            highlightColor={Colors.primary}
            highlightBorderWidth={Assets.size.line}
            selectedIndex={initial_month_index}
            onValueChange={data => {
              selectedMonth = data;
            }}
          />
          <ScrollPicker
            dataSource={days}
            wrapperHeight={customResponsiveHeight(24)}
            wrapperWidth={responsiveScreenWidth(100)}
            wrapperBackground={Colors.bg}
            itemHeight={customResponsiveHeight(8)}
            highlightColor={Colors.primary}
            highlightBorderWidth={Assets.size.line}
            selectedIndex={initial_day_index}
            onValueChange={data => {
              selectedDay = data;
            }}
          />
        </View>
        <CustomButton
          fill
          title={fa.components.date_picker.confirm}
          container_style={styles.button}
          onPress={() => {
            let month_number: string;
            switch (selectedMonth) {
              case fa.components.date_picker.farvardin:
                month_number = '01';
                break;
              case fa.components.date_picker.ordibehesht:
                month_number = '02';
                break;
              case fa.components.date_picker.khordad:
                month_number = '03';
                break;
              case fa.components.date_picker.tir:
                month_number = '04';
                break;
              case fa.components.date_picker.mordad:
                month_number = '05';
                break;
              case fa.components.date_picker.shahrivar:
                month_number = '06';
                break;
              case fa.components.date_picker.mehr:
                month_number = '07';
                break;
              case fa.components.date_picker.aban:
                month_number = '08';
                break;
              case fa.components.date_picker.azar:
                month_number = '09';
                break;
              case fa.components.date_picker.dey:
                month_number = '10';
                break;
              case fa.components.date_picker.bahman:
                month_number = '11';
                break;
              case fa.components.date_picker.esfand:
                month_number = '12';
                break;

              default:
                month_number = selectedMonth;
                break;
            }
            props.onConfirmPress(selectedDay, month_number, selectedYear);
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: Assets.size.vertical_1,
  },
  background: {
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
    position: 'absolute',
    backgroundColor: Colors.black,
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    opacity: Assets.size.modal_background_opacity,
  },
  modal: {
    width: responsiveScreenWidth(100),
    backgroundColor: Colors.bg,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 2 * Assets.size.border_1,
    borderTopRightRadius: 2 * Assets.size.border_1,
  },
  container: {
    marginTop: Assets.size.vertical_1,
    flexDirection: 'row',
    marginHorizontal: Assets.size.horizontal_2,
  },
});

export default CustomDatePicker;
