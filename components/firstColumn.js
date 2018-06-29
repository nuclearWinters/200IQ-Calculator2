import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
} from 'react-native';
import { imgSpellRequire, imgChampRequire, imgRuneRequire, imgObjRequire } from "../data/requireImg"

var objectData = require('../data/objectData.json')

class FirstColumn extends Component {
    render() {
        const { teamComp } = this.props
        const { selectedChampion } = this.props
        const requireBlack = require('../img/perk/black.png')
        const opacityComp = {alignSelf: "center", height: 15, width: 15, borderRadius: 15}
        const brightComp = {alignSelf: "center", height: 35, width: 35, borderRadius: 30}
        const imgChampionsReturns = teamComp.map((champ, index) => {
            const img = imgChampRequire[champ] !== undefined ? imgChampRequire[champ] : requireBlack
            if (champ == selectedChampion.id) {
                return(
                    <View key={index} margin={1}>
                        <Image style={brightComp} source={img} />
                        <View style={styles.imgLvAbsolute}>
                            <Text style={{fontSize: 8}}>{selectedChampion.level}</Text>
                        </View>
                    </View>
                )
            }
            else {
                return(
                    <View key={index} margin={1}>
                        <Image style={opacityComp} source={img} />
                    </View>
                )
            }
        })
        const runes = [selectedChampion.runes[0], selectedChampion.runesPage[1]]
        const imgRunesReturn = runes.map((rune, index)=>{
            const img = imgRuneRequire[rune] !== undefined ? imgRuneRequire[rune] : requireBlack
            return(
                <View key={index}>
                    <Image
                        style={{width: 15, height: 15, borderRadius: 7.5, alignSelf: "center"}}
                        source={img}
                    />
                </View>
            )
        })
        const imgItemsReturn = selectedChampion.items.map((item, index) => {
            const img = imgObjRequire[item] !== undefined ? imgObjRequire[item] : requireBlack
            return(
                <View key={index} style={styles.imagesItems}>
                    <Image
                        style={{width: 25, height: 25, borderRadius: 25, borderWidth: 1, borderColor: "white", alignSelf: 'center',}}
                        source={img}
                    />
                </View>
            )
        })
        return(
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={styles.imageChamp}>
                    {imgChampionsReturns}
                </View>
                <View style={styles.columnRune}>
                    {imgRunesReturn}
                </View>
                <View style = {{flex: .55, flexDirection: "row"}}>
                    {imgItemsReturn}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageChamp: {
      flex: .375,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row"
    },
    imagesItems: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    imgLvAbsolute: {
        width: 13,
        height: 13,
        borderRadius: 13,
        backgroundColor: "white",
        position: "absolute",
        left: 22,
        top: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    space: {
      flex: .1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    columnRune: {
        flex: .075,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    imageComp: {
        flex:1, 
        justifyContent: "center"
    },
    imagesComp: {
        flexDirection: "row", 
        flex: .1
    }
})

export default FirstColumn