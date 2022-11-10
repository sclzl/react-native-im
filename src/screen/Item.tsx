import React, { Component, PropsWithChildren } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager, DeviceEventEmitter, EmitterSubscription, Pressable } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class AppleStyleSwipeableRow extends Component<
    PropsWithChildren<{
        indexId: number, 
        onDelete: (index: number)=>void,
        onTotop: (index: number)=>void,
        data: any
    }>
> {

    private renderRightAction = (
        text: string,
        type: number,
        color: string,
        x: number,
        progress: Animated.AnimatedInterpolation
    ) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
            
        });
        const pressHandler = () => {
            if (type === 2) {
                this.props.onDelete(this.props.indexId);
            }
            if (type === 1) {
                this.close();
                setTimeout(()=> {
                    this.props.onTotop(this.props.indexId);
                })
            }
        };

        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <Pressable
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </Pressable>
            </Animated.View>
        );
    };

    private renderRightActions = (
        progress: Animated.AnimatedInterpolation,
        _dragAnimatedValue: Animated.AnimatedInterpolation
    ) => (
        <View
            style={{
                width: 192,
                flexDirection: 'row',
            }}>
            {this.renderRightAction(this.props.data.isTop ? '取消置顶' : '置顶', 1, '#ffab00', 128, progress)}
            {this.renderRightAction('删除', 2, '#dd2c00', 64, progress)}
        </View>
    );
    private device?: EmitterSubscription;
    private swipeableRow?: Swipeable;

    private updateRef = (ref: Swipeable) => {
        this.swipeableRow = ref;
    };
    private close = () => {
        this.swipeableRow?.close();
    };
    componentDidMount() {
        this.device = DeviceEventEmitter.addListener("sloseswipe", (id) => {
            if (this.props.indexId !== id) {
                this.close();
            }
        })
    }
    componentWillUnmount() {
        this.device?.remove();
    }
    render() {
        const { children } = this.props;
        return (
            <Swipeable
                ref={this.updateRef}
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderRightActions={this.renderRightActions}>
                {children}
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});