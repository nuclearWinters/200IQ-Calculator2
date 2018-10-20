import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image,
    TouchableHighlight
} from 'react-native';
import * as Progress from 'react-native-progress'

import { imgSpellRequire } from "../data/requireImg"

class SecondColumn extends Component {
    render() {

        const stats = this.props.stats
        const enemyStats = this.props.enemyStats
        const side = this.props.side

        const requireBlack = require('../img/perk/black.png')

        const spellArrayMap = stats.spells.map((spell, index) => {
            let percentAbility = "- "
            let color = "transparent"
            let img = imgSpellRequire[spell] === undefined ? requireBlack : imgSpellRequire[spell]
            if (spell == 7) {
                const arrayHeal = [0, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345]
                percentAbility = Math.round(((arrayHeal[stats.level]/stats.maxHealth)*(1+stats.healAndShieldPower))*100)
                color="rgb(144,228,102)"
            }
            else if (spell == 14) {
                const arrayIgnite = [0, 80, 105, 130, 155, 180, 205, 230, 255, 280, 305, 330, 355, 380, 405, 430, 455, 480, 505]
                percentAbility = enemyStats.maxHealth === 0 ? 0 : Math.round((arrayIgnite[stats.level]/enemyStats.maxHealth)*100)
                color="rgb(255,255,255)"
            }
            else if (spell == 21) {
                const arrayBarrier = [0, 115, 135, 155, 175, 195, 215, 235, 255, 275, 295, 315, 335, 355, 375, 395, 415, 435, 455]
                percentAbility = Math.round(((arrayBarrier[stats.level]/stats.maxHealth)*(1+stats.healAndShieldPower))*100)
                color="rgb(172,172,172)"
            }
            return(
                <View key = {index} style={styles.imageAndText}>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Image style={styles.imgAASpells} source={img}></Image>
                    </View>
                    <Text style={{flex: 1, fontSize: 12, backgroundColor: color, borderRadius: 2, width: "95%", textAlign: "center"}}>{percentAbility}%</Text>
                </View>
            )
        })

        const AA = require("../img/Long_Staff_item.png")

        const color = side == "Ally" ? "green" : "red"

        let damageReduction = 1
        //Ninja Tabi
        if (enemyStats.items.includes(3047)) {
            damageReduction *=.88
        }

        const ThisChampion_lethality = stats.stats.lethality*(0.6+(0.4*stats.level)/18)
        const ThisChampion_percentArmorPen = stats.stats.armorPen
        const EnemyChampion_physicalDamageReduction = 100/(100+((enemyStats.Armor*ThisChampion_percentArmorPen)-ThisChampion_lethality))
        const ThisChampion_percentMagicPen = stats.stats.magicPen
        const EnemyChampion_magicDamageReduction = 100/(100+((enemyStats.MR*ThisChampion_percentMagicPen)-stats.stats.MPen))
        let basicAA = stats.AD*EnemyChampion_physicalDamageReduction*damageReduction
        //console.log(basicAA)
        const onHitMagic = stats.stats.onHit.MagicDamage*EnemyChampion_magicDamageReduction
        //console.log(onHitMagic)
        const onHitPhysical = stats.stats.onHit.PhysicalDamage*EnemyChampion_physicalDamageReduction
        //console.log(onHitPhysical)
        const onHitTrue = stats.stats.onHit.TrueDamage
        let trueDamage = 1
        if (stats.buffs.includes("Conqueror")) {
            trueDamage *= (.8)
        }
        if (stats.stats.Crit === 1) {
            basicAA *= 2
            if (stats.items.includes(3031)){
                trueDamage *= (.85)
            }
        }

        const autoRaw = (((basicAA+onHitMagic+onHitPhysical)*(1+(1-trueDamage)))+onHitTrue)
        const autoAttack = (stats.AD/enemyStats.maxHealth) === null || enemyStats.maxHealth === 0 ? 0 : Math.round(((stats.AD/enemyStats.maxHealth)*100)*(100/(stats.Armor+100)))

        return(
            <View style={styles.healthBar} marginLeft={"5%"} marginRight={"5%"} marginTop={1}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <View style={{flex: .7, flexDirection: "column", backgroundColor: "rgb(230,230,230)", borderRadius: 5, margin: 1, padding: 1}}>
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 18}}>{Math.round(stats.health_bar*100)}%</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <View style={{flex: 1, justifyContent: "center"}}>
                                <Progress.Bar progress={Number(stats.health_bar)} width={null} height= {8} color={color}/>
                            </View>
                            <View style={{position:"absolute", right: 0, left: 0, top: 0, bottom: 0}}>
                                <View style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text style={{textAlign: "center", fontSize: 12}}>{stats.currentHealth}/{stats.maxHealth}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor: "rgb(230,230,230)", borderRadius: 5, margin: 1, flex: .3, flexDirection: "row", padding: 1}}>
                        {spellArrayMap}
                    </View>
                    
                    <View style={{backgroundColor: "rgb(230,230,230)", borderRadius: 5, margin: 1, flex: .15}}>
                        <TouchableHighlight underlayColor={"rgba(0,0,0,0.2)"} style={{flex: 1, borderRadius: 5}} onPress={() => this.props.changeAbilityHelpText("Autoataques", "on-hit: " + Math.round(autoRaw))}>
                            <View style={styles.imageAndText}>
                                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                    <Image style={styles.imgAASpells} source={AA}></Image>
                                </View>
                                <Text style={{flex: 1, fontSize: 12}}>{autoAttack}%</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    healthBar: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
    },
    imageAndText: {
        flex: 1, 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center"
    },
    imgAASpells: {
        width: 15, 
        height: 15
    }
})

export default SecondColumn

