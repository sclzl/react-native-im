import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet } from "react-native";
interface Props {
    source: ImageSourcePropType;
    size: number;
    style?: StyleProp<ImageStyle>
}
export default function ({size, source, style}: Props) {
    
    return (
        <Image 
        style={[{
            width: size,
            height: size,
            borderRadius: size/2,
        }, style]} 
        source={source} />
    )
}