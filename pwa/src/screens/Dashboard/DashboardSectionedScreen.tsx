//@ts-nocheck
import React from 'react';
import {
  DashboardBaseScreenPropsType,
  DashboardSectionedScreenPropsType,
} from '../../Types';
import DashboardBaseScreen from './DashboardBaseScreen';

const DashboardSectionedScreen = (
  props: DashboardBaseScreenPropsType & DashboardSectionedScreenPropsType,
) => {
  return (
    <DashboardBaseScreen
      render_card_inside={
        <>
          {props?.render_card_inside_1}
          {props?.render_card_inside_2}
          {props?.render_card_inside_3}
          {props?.render_card_inside_4}
          {props?.render_card_inside_5}
        </>
      }
      {...props}
    />
  );
};

export default DashboardSectionedScreen;
