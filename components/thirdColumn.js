import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image,
    TouchableHighlight
} from 'react-native';

class ThirdColumn extends Component {
    render() {
        const data = this.props.data
        const stats = this.props.stats
        const enemyStats = this.props.enemyStats

        const renderReturn = (eff, i) => {
            const MaxRounded = Math.round(eff.MaxPercent)
            const text = eff.Tag
            let effects = eff.Type + ": " + Math.round(eff.Max)
            let color = "white"
            if (eff.Type == "magic damage") {
                color="rgb(185,135,192)"
            }
            else if (eff.Type == "shield") {
                color="rgb(172,172,172)"
            }
            else if (eff.Type == "heal") {
                color="rgb(144,228,102)"
            }
            else if (eff.Type == "health growth") {
                color="rgb(255,143,133)"
            }
            else if (eff.Type == "magic shield") {
                color="rgb(235,133,255)"
            }
            else if (eff.Type == "physical damage") {
                color="rgb(232,93,90)"
            }
            else if (eff.Type == "true damage") {
                color="rgb(255,255,255)"
            }
            if (eff.Min === undefined) {
                return(
                    <TouchableHighlight key={i} underlayColor={"rgba(0,0,0,0.2)"} style={{flex:1, width: "100%", justifyContent: "center", alignItems: "center", borderRadius: 10}} onPress={() => this.props.changeAbilityHelpText(text, effects)}><Text style={{textAlign: "center", backgroundColor: color, borderRadius: 5, width: "95%", fontSize: 13}}>{MaxRounded}%</Text></TouchableHighlight>
                )
            }
            else {
                const MinRounded = Math.round(eff.MinPercent)
                let effects = eff.Type + ": " + Math.round(eff.Min) + " - " + Math.round(eff.Max)
                return(
                    <TouchableHighlight key={i} underlayColor={"rgba(0,0,0,0.2)"} style={{flex:1, width: "100%", justifyContent: "center", alignItems: "center", borderRadius: 10}} onPress={() => this.props.changeAbilityHelpText(text, effects)}><Text style={{textAlign: "center", backgroundColor: color, borderRadius: 5, width: "95%", fontSize: 13}}>{MinRounded}%-{MaxRounded}%</Text></TouchableHighlight>
                )
            }
        }

        const passiveEffects = data[0].map((eff, i) => {
            const abilityView = renderReturn(eff, i)
            return (
                abilityView
            )
        })
        const QEffects = data[1][0].map((eff, i) => {
            const abilityView = renderReturn(eff, i)
            return (
                abilityView
            )
        })
        const WEffects = data[1][1].map((eff, i) => {
            const abilityView = renderReturn(eff, i)
            return (
                abilityView
            )
        })
        const EEffects = data[1][2].map((eff, i) => {
            const abilityView = renderReturn(eff, i)
            return (
                abilityView
            )
        })
        const REffects = data[1][3].map((eff, i) => {
            const abilityView = renderReturn(eff, i)
            return (
                abilityView
            )
        })

        let damageReduction = 1
        //Ninja Tabi
        if (enemyStats.items.includes(3047)) {
            damageReduction *=.88
        }
        let trueDamage = 1
        let critTrueDamage = 1
        if (stats.buffs.includes("Conqueror")) {
            trueDamage *= (.8)
            critTrueDamage *= (.8)
        }
        if (stats.items.includes(3031)){
            critTrueDamage *= (.85)
        }
        const ThisChampion_lethality = stats.stats.lethality*(0.6+(0.4*stats.level)/18)
        const ThisChampion_percentArmorPen = stats.stats.armorPen
        const EnemyChampion_physicalDamageReduction = 100/(100+((enemyStats.Armor*ThisChampion_percentArmorPen)-ThisChampion_lethality))
        const ThisChampion_percentMagicPen = stats.stats.magicPen
        const EnemyChampion_magicDamageReduction = 100/(100+((enemyStats.MR*ThisChampion_percentMagicPen)-stats.stats.MPen))

        const DPSOnHitMagic = stats.ASP*stats.stats.onHit.MagicDamage*EnemyChampion_magicDamageReduction*(1+(1-trueDamage))
        const DPSOnHitPhysical = stats.ASP*stats.stats.onHit.PhysicalDamage*EnemyChampion_physicalDamageReduction*(1+(1-trueDamage))
        const DPSOnHitTrue = stats.ASP*stats.stats.onHit.TrueDamage
        const DPSAA = (stats.ASP*stats.AD*(1-stats.Crit)*EnemyChampion_physicalDamageReduction*damageReduction*(1+(1-trueDamage)))+(stats.ASP*stats.AD*stats.Crit*stats.stats.maxCrit*EnemyChampion_physicalDamageReduction*damageReduction*(1+(1-critTrueDamage)))
        const DPS = enemyStats.maxHealth === 0 ? 0 : Math.round((((DPSAA+DPSOnHitMagic+DPSOnHitPhysical+DPSOnHitTrue))/enemyStats.maxHealth)*100)
        const DPSRaw = enemyStats.maxHealth === 0 ? 0 : Math.round(((DPSAA+DPSOnHitMagic+DPSOnHitPhysical+DPSOnHitTrue)))

        return(
            <View style={styles.abilityBackground}>
                <View style={{flex: 1, flexDirection: "column"}}>
                    <View style={{flex: .7}}>
                        <View style={{flex: .2}}><Text style={{textAlign: "center"}}>Passive</Text></View>
                        <View style={{flex: .8, flexDirection: "column"}}>
                            {passiveEffects}
                        </View>
                    </View>
                    <TouchableHighlight underlayColor={"rgba(0,0,0,0.2)"} style={{flex:.3, width: "100%", justifyContent: "center", alignItems: "center", borderRadius: 3}} onPress={() => this.props.changeAbilityHelpText("Damage Per Second (DPS)", "on-hit per second: " + Math.round(DPSRaw))}>
                        <View>
                            <View style={{flex: .5, alignItems: "center", justifyContent: "center"}}><Text style={{textAlign: "center"}}>DPS</Text></View>
                            <View style={{flex: .5, alignItems: "center", justifyContent: "center"}}>
                                <Text style={{textAlign: "center"}}>{DPS}%</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: .1}}><Text style={{textAlign: "center"}}>Q</Text></View>
                    <View style={{flex: .9, flexDirection: "column"}}>
                        {QEffects}
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: .1}}><Text style={{textAlign: "center"}}>W</Text></View>
                    <View style={{flex: .9, flexDirection: "column"}}>
                        {WEffects}
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: .1}}><Text style={{textAlign: "center"}}>E</Text></View>
                    <View style={{flex: .9, flexDirection: "column"}}>
                        {EEffects}
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: .1}}><Text style={{textAlign: "center"}}>R</Text></View>
                    <View style={{flex: .9, flexDirection: "column"}}>
                        {REffects}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    abilityBackground: {
        backgroundColor: "rgb(230,230,230)",
        flex: 1, 
        flexDirection: "row",
        borderRadius: 5, 
        marginTop: 2
    }
})

export default ThirdColumn