//@ts-nocheck
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {BaseAuthScreenPropsType} from '../../Types';
import Assets from '../../assets/Assets';
import CardTitle from '../../components/CardTitle';
import CustomCard from '../../components/CustomCard';
import ScreenWrapper from '../ScreenWrapper';

const BaseAuthScreen = (props: BaseAuthScreenPropsType) => {
  return (
    <ScreenWrapper navigation={props.navigation}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}>
        <CustomCard container_style={styles.card}>
          <CardTitle title={props?.screen_title} />
          {props?.render_card_inside}
        </CustomCard>
        {props?.render_card_under}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  card: {
    marginTop: Assets.size.first_item_position_1,
  },
});

export default BaseAuthScreen;
