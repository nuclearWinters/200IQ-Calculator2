import abilityData from "../data/abilityDataRaw"
import { Morgana } from "./champions/Morgana"
import { Karma } from "./champions/Karma"
import { Annie } from "./champions/Annie"
import { Olaf } from "./champions/Olaf"
import { Galio, GalioPassive } from "./champions/Galio"
import { TwistedFate } from "./champions/TwistedFate";
import { XinZhao, XinZhaoPassive } from "./champions/XinZhao"
import { Urgot, UrgotPassive } from "./champions/Urgot"
import { LeBlanc } from "./champions/LeBlanc"
import { Vladimir } from "./champions/Vladimir"
import { Fiddlesticks } from "./champions/Fiddlesticks"
import { Kayle } from "./champions/Kayle"
import { MasterYi, MasterYiPassive } from "./champions/MasterYi"
import { Alistar, AlistarPassive } from "./champions/Alistar"
import { Ryze } from "./champions/Ryze"
import { Sion } from "./champions/Sion"
import { Sivir } from "./champions/Sivir"
import { Soraka } from "./champions/Soraka"
import { Teemo } from "./champions/Teemo"
import { Tristana } from "./champions/Tristana"
import { Warwick, WarwickPassive } from "./champions/Warwick"
import { Nunu } from "./champions/Nunu"
import { MissFortune, MissFortunePassive } from "./champions/MissFortune";
import { NoAbility } from "./champions/NoAbility";

const abilityUpdate = (data) => {
    //const abilityData = require("../data/abilityDataRaw.json")
    let dataToReturn = []
    for (const my_champion in data) {
        let enemy_champion = "enemyChampion"
        if (my_champion === "enemyChampion") {
            enemy_champion = "allyChampion"
        }
        //ThisChampion
        const ThisChampion = data[my_champion].id

        const ThisChampion_currentHealth = data[my_champion].currentHealth
        const ThisChampion_healthPercent = data[my_champion].health_bar
        const ThisChampion_baseHealth = data[my_champion].stats.BaseHealth
        const ThisChampion_maxHealth = data[my_champion].maxHealth
        const ThisChampion_bonusHealth = ThisChampion_maxHealth - ThisChampion_baseHealth
        const ThisChampion_lv = data[my_champion].level

        const ThisChampion_baseArmor = data[my_champion].stats.BaseArmor
        const ThisChampion_maxArmor = data[my_champion].Armor
        const ThisChampion_bonusArmor = ThisChampion_maxArmor - ThisChampion_baseArmor

        const ThisChampion_baseMR = data[my_champion].stats.BaseMR
        const ThisChampion_maxMR = data[my_champion].MR
        const ThisChampion_bonusMR = ThisChampion_maxMR - ThisChampion_baseMR

        const ThisChampion_magicDamageReduction = 100/(100+ThisChampion_maxMR)
        const ThisChampion_physicalDamageReduction = 100/(100+ThisChampion_maxArmor)

        const feast_stack = 0
        const kindred_stack = 0
        const thresh_stack = 0
        const nasus_stack = 0

        const ThisChampion_baseAD = data[my_champion].stats.BaseAD
        const ThisChampion_maxAD = data[my_champion].AD
        const ThisChampion_bonusAD = ThisChampion_maxAD - ThisChampion_baseAD

        const ThisChampion_AP = data[my_champion].AP

        const ThisChampion_ASP = data[my_champion].ASP

        const ThisChampion_Crit = data[my_champion].Crit

        const ThisChampion_level = data[my_champion].level

        const ThisChampion_HSP = data[my_champion].stats.healAndShieldPower

        const ThisChampion_manaPercent = data[my_champion].mana_bar
        const ThisChampion_baseMana = data[my_champion].stats.BaseMana
        const ThisChampion_maxMana = data[my_champion].maxMana
        const ThisChampion_bonusMana = ThisChampion_maxMana - ThisChampion_baseMana

        const ThisChampion_lethality = data[my_champion].stats.lethality*(0.6+(0.4*ThisChampion_level)/18)
        const ThisChampion_flatMagicPen = data[my_champion].stats.MPen
        const ThisChampion_percentArmorPen = data[my_champion].stats.armorPen
        const ThisChampion_percentMagicPen = data[my_champion].stats.magicPen

        //EnemyChampion
        const EnemyChampion_currentHealth = data[enemy_champion].currentHealth
        const EnemyChampion_healthPercent = data[enemy_champion].health_bar
        const EnemyChampion_baseHealth = data[enemy_champion].stats.BaseHealth
        const EnemyChampion_maxHealth = data[enemy_champion].maxHealth
        const EnemyChampion_bonusHealth = EnemyChampion_maxHealth - EnemyChampion_baseHealth

        const EnemyChampion_maxMR = data[enemy_champion].MR
        const EnemyChampion_maxArmor = data[enemy_champion].Armor
        
        const EnemyChampion_magicDamageReduction = 100/(100+((EnemyChampion_maxMR*ThisChampion_percentMagicPen)-ThisChampion_flatMagicPen))
        const EnemyChampion_physicalDamageReduction = 100/(100+((EnemyChampion_maxArmor*ThisChampion_percentArmorPen)-ThisChampion_lethality))

        //SkillPoints
        const ThisChampion_skillOrder = data[my_champion].SkillPoints
        //console.log(ThisChampion_skillOrder)
        
        const PointsQ = ThisChampion_skillOrder[0]
        const PointsW = ThisChampion_skillOrder[1]
        const PointsE = ThisChampion_skillOrder[2]
        const PointsR = ThisChampion_skillOrder[3]

        //On hit final value
        const OnHit = data[my_champion].stats.onHit

        //Creo lista que me permita guardar efectos totales (bases + escalamiento) de cada habilidad
        let championList = []
        let list_effects_passive = []
        let list_effects_all_abilities = []
        let list_cdr_per_ability = []
        
        if (abilityData["data"][ThisChampion] !== undefined) {
            //Obtener los CDR de cada habilidad de acuerdo a su rank up.
            for (const ability in abilityData["data"][ThisChampion]["spells"]) {
                list_cdr_per_ability.push(abilityData["data"][ThisChampion]["spells"][ability]["cooldown"][ThisChampion_skillOrder[ability]-1])
            }
            //Obtener los datos de cada campeon
            //ANNIE
            if (ThisChampion === 1) {
                list_effects_all_abilities = Annie(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP)
            }
            //OLAF
            else if (ThisChampion === 2) {
                list_effects_all_abilities = Olaf(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_bonusAD, ThisChampion_maxAD)
            }
            //GALIO
            else if (ThisChampion === 3) {
                list_effects_passive = GalioPassive(list_effects_passive, ThisChampion_level, ThisChampion_maxAD, ThisChampion_AP, ThisChampion_bonusMR)
                list_effects_all_abilities = Galio(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, EnemyChampion_maxHealth, ThisChampion_maxHealth)
            }
            //TWISTEDFATE
            else if (ThisChampion === 4) {
                list_effects_all_abilities = TwistedFate(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_maxAD)
            }
            //XINZHAO
            else if (ThisChampion === 5) {
                list_effects_passive = XinZhaoPassive(list_effects_passive, ThisChampion_level, ThisChampion_maxAD, ThisChampion_AP)
                list_effects_all_abilities = XinZhao(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_bonusAD, ThisChampion_maxAD, EnemyChampion_currentHealth)
            }
            //URGOT
            else if (ThisChampion === 6) {
                list_effects_passive = UrgotPassive(list_effects_passive, ThisChampion_level, ThisChampion_maxAD, EnemyChampion_maxHealth)
                list_effects_all_abilities = Urgot(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_maxAD, ThisChampion_bonusHealth)
            }
            //LEBLANC
            else if (ThisChampion === 7) {
                list_effects_all_abilities = LeBlanc(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP)
            }
            //VLADIMIR
            else if (ThisChampion === 8) {
                list_effects_all_abilities = Vladimir(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction)
            }
            //FIDDLESTICKS
            else if (ThisChampion === 9) {
                list_effects_all_abilities = Fiddlesticks(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction)
            }
            //KAYLE
            else if (ThisChampion === 10) {
                list_effects_all_abilities = Kayle(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD)
            }
            //MASTERYI
            else if (ThisChampion === 11) {
                list_effects_passive = MasterYiPassive(list_effects_passive, EnemyChampion_magicDamageReduction, EnemyChampion_physicalDamageReduction, ThisChampion_maxAD, OnHit)
                list_effects_all_abilities = MasterYi(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD)
            }
            //ALISTAR
            else if (ThisChampion === 12) {
                list_effects_passive = AlistarPassive(list_effects_passive, ThisChampion_level)
                list_effects_all_abilities = Alistar(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD)
            }
            //RYZE
            else if (ThisChampion === 13) {
                list_effects_all_abilities = Ryze(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana)
            }
            //SION
            else if (ThisChampion === 14) {
                list_effects_all_abilities = Sion(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth)
            }
            //SIVIR
            else if (ThisChampion === 15) {
                list_effects_all_abilities = Sivir(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth)
            }
            //SORAKA
            else if (ThisChampion === 16) {
                list_effects_all_abilities = Soraka(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent)
            }
            //TEEMO
            else if (ThisChampion === 17) {
                list_effects_all_abilities = Teemo(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent)
            }
            //TRISTANA
            else if (ThisChampion === 18) {
                list_effects_all_abilities = Tristana(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent)
            }
            //WARWICK
            else if (ThisChampion === 19) {
                list_effects_passive = WarwickPassive(list_effects_passive, ThisChampion_healthPercent, ThisChampion_level)
                list_effects_all_abilities = Warwick(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent, OnHit, EnemyChampion_physicalDamageReduction)
            }
            //NUNU
            else if (ThisChampion === 20) {
                list_effects_all_abilities = Nunu(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent)
            }
            //MISSFORTUNE
            else if (ThisChampion === 21) {
                list_effects_passive = MissFortunePassive(list_effects_passive, ThisChampion_level, ThisChampion_maxAD)
                list_effects_all_abilities = MissFortune(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent, OnHit, EnemyChampion_physicalDamageReduction)
            }
            //MORGANA
            else if (ThisChampion === 25) {
                list_effects_all_abilities = Morgana(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, EnemyChampion_healthPercent)
            }
            //KARMA
            else if (ThisChampion === 43) {
                list_effects_all_abilities = Karma(list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_healthPercent, ThisChampion_maxHealth)
            }
            //NOABILITY
            else if (ThisChampion === 999) {
                list_effects_all_abilities = NoAbility(list_effects_all_abilities)
            }
        }
        
        championList.push(list_effects_passive)
        let shieldEnhancement = 1
        let healEnhancement = 1
        let damageReduction = 1
        if (data[enemy_champion].id === 1) {
            if (data[enemy_champion].buffs.includes("MoltenShield")) {
            const array = [0, .16 , .22 , .28 , .34 , .4]
            damageReduction *= (1-array[data[enemy_champion].SkillPoints[2]])
            }
        }
        //Olaf E (No incrementa nada mas que el heal del smite, el heal y el lifesteal)
        if (data[my_champion].id === 2) {
            if (data[my_champion].buffs.includes("ViciousStrikes")) {
            healEnhancement *= 1+((1-ThisChampion_healthPercent)*.5)
            }
        }
        //Trundle W
        if (data[my_champion].id === 48) {
            if (data[my_champion].buffs.includes("FrozenDomain")) {
                healEnhancement *= 1.25
            }
        }
        //Spirit Visage
        if (data[my_champion].items.includes(3065)) {
            healEnhancement *= 1.3
        }
        //Revitalize
        if (data[my_champion].runes.includes(8453)) {
            if (ThisChampion_healthPercent < .4) {
                healEnhancement *= 1.1
                shieldEnhancement *= 1.1
            }
        }

        shieldEnhancement *= 1+ThisChampion_HSP
        healEnhancement *= 1+ThisChampion_HSP
        
        for (const ability in list_effects_all_abilities) {
            for (const eff in list_effects_all_abilities[ability]) {
                const effect = list_effects_all_abilities[ability][eff]
                if (effect.Type === "magic damage") {
                    //console.log(effect.Max)
                    effect.Max = effect.Max * EnemyChampion_magicDamageReduction * damageReduction
                    //console.log(effect.Max)
                    effect.MaxPercent = effect.Max / EnemyChampion_maxHealth * 100
                    //console.log(effect.MaxPercent)
                    if (effect.Min !== undefined) {
                        //console.log(effect.Min)
                        effect.Min = effect.Min * EnemyChampion_magicDamageReduction * damageReduction
                        //console.log(effect.Min)
                        effect.MinPercent = effect.Min / EnemyChampion_maxHealth * 100
                    }
                }
                else if (effect.Type === "physical damage") {
                    effect.Max = effect.Max * EnemyChampion_physicalDamageReduction * damageReduction
                    effect.MaxPercent = effect.Max / EnemyChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.Min = effect.Min * EnemyChampion_magicDamageReduction * damageReduction
                        effect.MinPercent = effect.Min / EnemyChampion_maxHealth * 100
                    }
                }
                else if (effect.Type === "true damage") {
                    effect.Max = effect.Max
                    effect.MaxPercent = effect.Max / EnemyChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.Min = effect.Min
                        effect.MinPercent = effect.Min / EnemyChampion_maxHealth * 100
                    }
                }
                else if (effect.Type === "heal") {
                    effect.Max = effect.Max * healEnhancement
                    effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.Min = effect.Min * healEnhancement
                        effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                    }
                }
                else if (effect.Type === "health growth") {
                    effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                    }
                }
                else if (effect.Type === "shield") {
                    effect.Max = effect.Max * shieldEnhancement
                    effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.Min = effect.Min * (1 + ThisChampion_HSP)
                        effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                    }
                }
                else if (effect.Type === "magic shield") {
                    effect.Max = effect.Max * shieldEnhancement
                    effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.Min = effect.Min * (1 + ThisChampion_HSP)
                        effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                    }
                }
                else if (effect.Type === "magic shield") {
                    effect.Max = effect.Max * shieldEnhancement
                    effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.Min = effect.Min * (1 + ThisChampion_HSP)
                        effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                    }
                }
                else if (effect.Type === "on-hit") {
                    effect.Max = effect.Max
                    effect.MaxPercent = effect.Max / EnemyChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.Min = effect.Min
                        effect.MinPercent = effect.Min / EnemyChampion_maxHealth * 100
                    }
                }
            }
        }
        for (const eff in list_effects_passive) {
            const effect = list_effects_passive[eff]
            if (effect.Type === "magic damage") {
                //console.log(effect.Max)
                effect.Max = effect.Max * EnemyChampion_magicDamageReduction * damageReduction
                //console.log(effect.Max)
                effect.MaxPercent = effect.Max / EnemyChampion_maxHealth * 100
                //console.log(effect.MaxPercent)
                if (effect.Min !== undefined) {
                    //console.log(effect.Min)
                    effect.Min = effect.Min * EnemyChampion_magicDamageReduction * damageReduction
                    //console.log(effect.Min)
                    effect.MinPercent = effect.Min / EnemyChampion_maxHealth * 100
                }
            }
            else if (effect.Type === "physical damage") {
                effect.Max = effect.Max * EnemyChampion_physicalDamageReduction * damageReduction
                effect.MaxPercent = effect.Max / EnemyChampion_maxHealth * 100
                if (effect.Min !== undefined) {
                    effect.Min = effect.Min * EnemyChampion_magicDamageReduction * damageReduction
                    effect.MinPercent = effect.Min / EnemyChampion_maxHealth * 100
                }
            }
            else if (effect.Type === "true damage") {
                effect.Max = effect.Max
                effect.MaxPercent = effect.Max / EnemyChampion_maxHealth * 100
                if (effect.Min !== undefined) {
                    effect.Min = effect.Min
                    effect.MinPercent = effect.Min / EnemyChampion_maxHealth * 100
                }
            }
            else if (effect.Type === "heal") {
                effect.Max = effect.Max * healEnhancement
                effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                if (effect.Min !== undefined) {
                    effect.Min = effect.Min * healEnhancement
                    effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                }
            }
            else if (effect.Type === "health growth") {
                effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                if (effect.Min !== undefined) {
                    effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                }
            }
            else if (effect.Type === "shield") {
                effect.Max = effect.Max * shieldEnhancement
                effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                if (effect.Min !== undefined) {
                    effect.Min = effect.Min * (1 + ThisChampion_HSP)
                    effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                }
            }
            else if (effect.Type === "magic shield") {
                effect.Max = effect.Max * shieldEnhancement
                effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                if (effect.Min !== undefined) {
                    effect.Min = effect.Min * (1 + ThisChampion_HSP)
                    effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                }
            }  
            else if (effect.Type === "on-hit") {
                effect.Max = effect.Max
                effect.MaxPercent = effect.Max / EnemyChampion_maxHealth * 100
                if (effect.Min !== undefined) {
                    effect.Min = effect.Min
                    effect.MinPercent = effect.Min / EnemyChampion_maxHealth * 100
                }
            }  
        }
        championList.push(list_effects_all_abilities)
        championList.push(list_cdr_per_ability)
        dataToReturn.push(championList)
    }
    return dataToReturn
}

export { abilityUpdate }

/*const abilityUpdate = (data) => {
    const abilityData = require("../data/abilityDataRaw.json")
    let dataToReturn = []
    for (const my_champion in data) {
        let enemy_champion = "enemyChampion"
        if (my_champion == "enemyChampion") {
            enemy_champion = "allyChampion"
        }
        //ThisChampion
        const ThisChampion = data[my_champion].id

        const ThisChampion_healthPercent = data[my_champion].health_bar
        const ThisChampion_baseHealth = data[my_champion].stats.BaseHealth
        const ThisChampion_maxHealth = data[my_champion].maxHealth
        const ThisChampion_bonusHealth = ThisChampion_maxHealth - ThisChampion_baseHealth

        const ThisChampion_baseArmor = data[my_champion].stats.BaseArmor
        const ThisChampion_maxArmor = data[my_champion].Armor
        const ThisChampion_bonusArmor = ThisChampion_maxArmor - ThisChampion_baseArmor

        const ThisChampion_baseMR = data[my_champion].stats.BaseMR
        const ThisChampion_maxMR = data[my_champion].MR
        const ThisChampion_bonusMR = ThisChampion_maxMR - ThisChampion_baseMR

        const ThisChampion_magicDamageReduction = 100/(100+ThisChampion_maxMR)
        const ThisChampion_physicalDamageReduction = 100/(100+ThisChampion_maxArmor)

        const feast_stack = 0
        const kindred_stack = 0
        const thresh_stack = 0
        const nasus_stack = 0

        const ThisChampion_baseAD = data[my_champion].stats.BaseAD
        const ThisChampion_maxAD = data[my_champion].AD
        const BonusAD = ThisChampion_maxAD - ThisChampion_baseAD

        const ThisChampion_AP = data[my_champion].AP

        const ThisChampion_ASP = data[my_champion].ASP

        const ThisChampion_Crit = data[my_champion].Crit

        const ThisChampion_level = data[my_champion].level

        const ThisChampion_HSP = data[my_champion].stats.healAndShieldPower

        const ThisChampion_manaPercent = data[my_champion].mana_bar
        const ThisChampion_baseMana = data[my_champion].stats.BaseMana
        const ThisChampion_maxMana = data[my_champion].maxMana
        const ThisChampion_bonusMana = ThisChampion_maxMana - ThisChampion_baseMana

        //EnemyChampion
        const EnemyChampion_healthPercent = data[enemy_champion].health_bar
        const EnemyChampion_baseHealth = data[enemy_champion].stats.BaseHealth
        const EnemyChampion_maxHealth = data[enemy_champion].maxHealth
        const EnemyChampion_bonusHealth = EnemyChampion_maxHealth - EnemyChampion_baseHealth

        const EnemyChampion_maxMR = data[enemy_champion].MR
        const EnemyChampion_maxArmor = data[enemy_champion].Armor
        
        const EnemyChampion_magicDamageReduction = 100/(100+EnemyChampion_maxMR)
        const EnemyChampion_physicalDamageReduction = 100/(100+EnemyChampion_maxArmor)

        //SkillPoints
        const ThisChampion_skillOrder = data[my_champion].SkillPoints
        //console.log(ThisChampion_skillOrder)
        
        const PointsQ = ThisChampion_skillOrder[0]
        const PointsW = ThisChampion_skillOrder[1]
        const PointsE = ThisChampion_skillOrder[2]
        const PointsR = ThisChampion_skillOrder[3]

        //Creo lista que me permita guardar efectos totales (bases + escalamiento) de cada habilidad
        let championList = []
        let list_effects_passive = []
        let list_effects_all_abilities = []
        let list_cdr_per_ability = []
        
        if (abilityData["data"][ThisChampion] !== undefined) {
            //Obtener los CDR de cada habilidad de acuerdo a su rank up.
            for (const ability in abilityData["data"][ThisChampion]["spells"]) {
                list_cdr_per_ability.push(abilityData["data"][ThisChampion]["spells"][ability]["cooldown"][ThisChampion_skillOrder[ability]-1])
            }
            //Obtener los datos de cada campeon
            //ANNIE
            if (ThisChampion == 1) {
                //Sin información importante en pasiva por que se ignora
                for (const ability in abilityData["data"][ThisChampion]["spells"]) {
                    let list_effect_per_ability = []
                    //Q
                    if (ability == 0) {
                        //¿Cuantos efectos tiene la habilidad?
                        const Effects = 1
                        for (let i = 1; i <= Effects; i++) {
                            //Primer efecto
                            if (i == 1) {
                                const Bases = [0, 80, 115, 150, 185, 220]
                                const Scaling = [0, 0.8, 0.8, 0.8, 0.8, 0.8]
                                const Type = "magic damage"
                                const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_AP)
                                const Tag = "Annie lanza un hechizo que realiza daño magico."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                        }
                    }
                    //W
                    if (ability == 1) {
                        const Effects = 1
                        for (let i = 1; i <= Effects; i++) {
                            //Primer efecto
                            if (i == 1) {
                                const Bases = [0, 70, 115, 160, 205, 250]
                                const Scaling = [0, 0.85, 0.85, 0.85, 0.85, 0.85]
                                const Type = "magic damage"
                                const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP)
                                const Tag = "Annie lanza un hechizo en cono que realiza daño magico."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                        }
                    }
                    //E
                    if (ability == 2) {
                        const Effects = 1
                        for (let i = 1; i <= Effects; i++) {
                            //Primer efecto
                            if (i == 1) {
                                const Bases = [0, 20, 30, 40, 50, 60]
                                const Scaling = [0, 0.2, 0.2, 0.2, 0.2, 0.2]
                                const Type = "magic damage"
                                const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                                const Tag = "Enemigos que dañen a Annie con ataques basicos, reciben daño magico."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                        }
                    }
                    //R
                    if (ability == 3) {
                        const Effects = 3
                        for (let i = 1; i <= Effects; i++) {
                            //Primer efecto
                            if (i == 1) {
                                const Bases = [0, 150, 275, 400]
                                const Scaling = [0, 0.65, 0.65, 0.65]
                                const Type = "magic damage"
                                const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                                const Tag = "Annie lanza a Tibbers y hace daño magico en area."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                            //Segundo efecto
                            if (i == 2) {
                                const Bases = [0, 10, 15, 20]
                                const Scaling = [0, 0.1, 0.1, 0.1]
                                const Type = "magic damage"
                                const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                                const Tag = "Daño por segundo del aura."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                            //Tercer efecto
                            if (i == 3) {
                                const Bases = [0, 50, 75, 100]
                                const Scaling = [0, 0.15, 0.15, 0.15]
                                const Type = "magic damage"
                                const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                                const Tag = "Daño magico por básico."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                        }
                    }
                    list_effects_all_abilities.push(list_effect_per_ability)
                }
            }
            //MORGANA
            if (ThisChampion == 25) {
                //Sin información importante en pasiva por que se ignora
                for (const ability in abilityData["data"][ThisChampion]["spells"]) {
                    let list_effect_per_ability = []
                    //Q
                    if (ability == 0) {
                        //¿Cuantos efectos tiene la habilidad?
                        const Effects = 1
                        for (let i = 1; i <= Effects; i++) {
                            //Primer efecto
                            if (i == 1) {
                                const Bases = [0, 80, 135, 190, 245, 300 ]
                                const Scaling = [0, 0.9, 0.9, 0.9, 0.9, 0.9]
                                const Type = "magic damage"
                                const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_AP)
                                const Tag = "Morgana releases a sphere of dark magic that travels in a line, dealing magic damage to the first enemy hit and rooting them."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                            
                        }
                    }
                    //W
                    if (ability == 1) {
                        const Effects = 2
                        for (let i = 1; i <= Effects; i++) {
                            //Primer efecto
                            if (i == 1) {
                                const Bases = [0, 8, 16, 24, 32, 40]
                                const Scaling = [0, 0.11, 0.11, 0.11, 0.11, 0.11]
                                const Type = "magic damage"
                                const Max = (Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP)) * (1+((1 - EnemyChampion_healthPercent) * 0.5))
                                const Tag = "Morgana infects the target area for 5 seconds, causing enemies who stand on the location to take magic damage every half second, increased by 0% - 50% (based on target's missing health)."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                            //Segundo efecto
                            if (i == 2) {
                                const BasesMax = [0, 120, 240, 360, 480, 600]
                                const BasesMin = [0, 80, 160, 240, 320, 400]
                                const ScalingMin = [0, 1.1, 1.1, 1.1, 1.1, 1.1]
                                const ScalingMax = [0, 1.65, 1.65, 1.65, 1.65, 1.65]
                                const Type = "magic damage"
                                const Max = BasesMax[PointsW] + (ScalingMax[PointsW]*ThisChampion_AP)
                                const Min = BasesMin[PointsW] + (ScalingMin[PointsW]*ThisChampion_AP)
                                const Tag = "Minimum and maximum total damage."
                                const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                                list_effect_per_ability.push(Obj)
                            }
                        }
                    }
                    //E
                    if (ability == 2) {
                        const Effects = 1
                        for (let i = 1; i <= Effects; i++) {
                            //Primer efecto
                            if (i == 1) {
                                const Bases = [0, 70, 140, 210, 280, 350 ]
                                const Scaling = [0, 0.7, 0.7, 0.7, 0.7, 0.7]
                                const Type = "magic shield"
                                const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                                const Tag = "Morgana magic shields the target friendly champion or herself for up to 5 seconds, absorbing magic damage."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                        }
                    }
                    //R
                    if (ability == 3) {
                        const Effects = 2
                        for (let i = 1; i <= Effects; i++) {
                            //Primer efecto
                            if (i == 1) {
                                const Bases = [0, 150, 225, 300]
                                const Scaling = [0, 0.7, 0.7, 0.7]
                                const Type = "magic damage"
                                const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                                const Tag = "Morgana latches chains of energy onto nearby enemy champions, dealing magic damage."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                            //Segundo efecto
                            if (i == 2) {
                                const Bases = [0, 150, 225, 300]
                                const Scaling = [0, 0.7, 0.7, 0.7]
                                const Type = "magic damage"
                                const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                                const Tag = "Targets who did not leave the tether range after 3 seconds are stunned for 1.5 seconds and dealt the same magic damage again."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                        }
                    }
                    list_effects_all_abilities.push(list_effect_per_ability)
                }
            }
            //KARMA
            if (ThisChampion == 43) {
                //Sin información importante en pasiva por que se ignora
                for (const ability in abilityData["data"][ThisChampion]["spells"]) {
                    let list_effect_per_ability = []
                    //Q
                    if (ability == 0) {
                        //¿Cuantos efectos tiene la habilidad?
                        const Effects = 3
                        for (let i = 1; i <= Effects; i++) {
                            //Primer efecto
                            if (i == 1) {
                                const Bases = [0, 80, 125, 170, 215, 260 ]
                                const Scaling = [0, 0.6, 0.6, 0.6, 0.6, 0.6]
                                const Type = "magic damage"
                                const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_AP)
                                const Tag = "Karma fires a burst of energy that detonates upon hitting an enemy, dealing magic damage to all nearby enemies."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                            if (i == 2) {
                                const Bases = [0, 80, 125, 170, 215, 260 ]
                                const Scaling = [0, 0.6, 0.6, 0.6, 0.6, 0.6]
                                const BasesRankR = [25, 75, 125, 175]
                                const ScalingRankR = [0, 0.3, 0.3, 0.3, 0.3]
                                const Type = "magic damage"
                                const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_AP) + BasesRankR[PointsR] + (ScalingRankR[PointsR]*ThisChampion_AP)
                                const Tag = "MANTRA - SOULFLARE: Inner Flame detonates upon hitting an enemy or reaching maximum range, dealing bonus magic damage in an increased area and leaving an area around it for 1.5 seconds."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                            if (i == 3) {
                                const Bases = [0, 50, 150, 250, 350 ]
                                const Scaling = [0, 0.6, 0.6, 0.6, 0.6, 0.6]
                                const Type = "magic damage"
                                const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                                const Tag = "MANTRA - SOULFLARE: At the end of its duration, the area explodes, dealing magic damage to all enemies inside."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                        }
                    }
                    //W
                    if (ability == 1) {
                        const Effects = 3
                        for (let i = 1; i <= Effects; i++) {
                            //Primer efecto
                            if (i == 1) {
                                const Bases = [0, 30, 55, 80, 105, 130]
                                const Scaling = [0, 0.45, 0.45, 0.45, 0.45, 0.45]
                                const Type = "magic damage"
                                const Max = (Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP))
                                const Tag = "Karma forms a tether between her and the target enemy champion or monster for 2 seconds, dealing them magic damage."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                            //Segundo efecto
                            if (i == 2) {
                                const Bases = [0, 30, 55, 80, 105, 130]
                                const Scaling = [0, 0.45, 0.45, 0.45, 0.45, 0.45]
                                const Type = "magic damage"
                                const Max = (Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP))
                                const Tag = "If the target does not break the tether, it deals them magic damage again and they are Root icon rooted for a short time."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                            //Tercer efecto
                            if (i == 2) {
                                const Bases = [0, .2, .2, .2, .2, .2]
                                const Scaling = [0, .01, .01, .01, .01, .01]
                                const Type = "heal"
                                const Max = ((1-ThisChampion_healthPercent)*ThisChampion_maxHealth)*(Bases[PointsW] + ((Scaling[PointsW]*ThisChampion_AP)/100))
                                const Tag = "MANTRA - RENEWAL: Focused Resolve heals Karma for 20% (+ 1% per 100 AP) missing health upon being cast and once more upon Root icon rooting its target, with the Root icon root duration increased."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                        }
                    }
                    //E
                    if (ability == 2) {
                        const Effects = 3
                        for (let i = 1; i <= Effects; i++) {
                            //Primer efecto
                            if (i == 1) {
                                const Bases = [0, 70, 95, 120, 145, 170]
                                const Scaling = [0, 0.5, 0.5, 0.5, 0.5, 0.5]
                                const Type = "shield"
                                const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                                const Tag = "Karma shields the target allied champion or herself for 4 seconds."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                            //Segundo efecto
                            if (i == 2) {
                                const Bases = [0, 70, 95, 120, 145, 170]
                                const BasesRankR =  [30, 90, 150, 210]
                                const Scaling = [0, 0.5, 0.5, 0.5, 0.5, 0.5]
                                const ScalingRankR = [0, 0.6, 0.6, 0.6, 0.6]
                                const Type = "shield"
                                const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP) + BasesRankR[PointsR] + (ScalingRankR[PointsR]*ThisChampion_AP)
                                const Tag = " MANTRA - DEFIANCE: Inspire overflows with energy, increasing the target's shield."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                            //Tercer efecto
                            if (i == 3) {
                                const Bases = [0, 9, 27, 45, 63]
                                const Scaling = [0, 0.18, 0.18, 0.18, 0.18]
                                const Type = "shield"
                                const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                                const Tag = "MANTRA - DEFIANCE: Shielding all nearby allied champions for 30% of the total amount."
                                const Obj = {Max: Max, Type: Type, Tag: Tag}
                                list_effect_per_ability.push(Obj)
                            }
                        }
                    }
                    //R
                    if (ability == 3) {
                        //No hay efectos
                    }
                    list_effects_all_abilities.push(list_effect_per_ability)
                }
            }
        }
        else {
        }
        championList.push(list_effects_passive)

        for (const ability in list_effects_all_abilities) {
            for (const eff in list_effects_all_abilities[ability]) {
                const effect = list_effects_all_abilities[ability][eff]
                if (effect.Type == "magic damage") {
                    //console.log(effect.Max)
                    effect.Max = effect.Max * EnemyChampion_magicDamageReduction
                    //console.log(effect.Max)
                    effect.MaxPercent = effect.Max / EnemyChampion_maxHealth * 100
                    //console.log(effect.MaxPercent)
                    if (effect.Min !== undefined) {
                        //console.log(effect.Min)
                        effect.Min = effect.Min * EnemyChampion_magicDamageReduction
                        //console.log(effect.Min)
                        effect.MinPercent = effect.Min / EnemyChampion_maxHealth * 100
                    }
                }
                else if (effect.Type == "physical damage") {
                    effect.Max = effect.Max * EnemyChampion_physicalDamageReduction
                    effect.MaxPercent = effect.Max / EnemyChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.Min = effect.Min * EnemyChampion_magicDamageReduction
                        effect.MinPercent = effect.Min / EnemyChampion_maxHealth * 100
                    }
                }
                else if (effect.Type == "heal") {
                    effect.Max = effect.Max * (1 + ThisChampion_HSP)
                    effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.Min = effect.Min * (1 + ThisChampion_HSP)
                        effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                    }
                }
                else if (effect.Type == "health growth") {
                    effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                    }
                }
                else if (effect.Type == "shield") {
                    effect.Max = effect.Max * (1 + ThisChampion_HSP)
                    effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.Min = effect.Min * (1 + ThisChampion_HSP)
                        effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                    }
                }
                else if (effect.Type == "magic shield") {
                    effect.Max = effect.Max * (1 + ThisChampion_HSP)
                    effect.MaxPercent = effect.Max / ThisChampion_maxHealth * 100
                    if (effect.Min !== undefined) {
                        effect.Min = effect.Min * (1 + ThisChampion_HSP)
                        effect.MinPercent = effect.Min / ThisChampion_maxHealth * 100
                    }
                }
                
            }
        }
        //console.log(list_effects_all_abilities)
        championList.push(list_effects_all_abilities)
        championList.push(list_cdr_per_ability)
        dataToReturn.push(championList)
    }
    return dataToReturn
}

export { abilityUpdate }*/
