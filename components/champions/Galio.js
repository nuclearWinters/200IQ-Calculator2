const Galio = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, EnemyChampion_maxHealth, ThisChampion_maxHealth) => {    
    //Sin información importante en pasiva por que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            //¿Cuantos efectos tiene la habilidad?
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 50, 80, 110, 140, 170]
                    const Scaling = [0, 0.8, 0.8, 0.8, 0.8, 0.8]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_AP)
                    const Tag = "Galio fires two windblasts that arc to either side before converging to the target area, dealing magic damage to all enemies they pass through."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 2) {
                    const BasesMax = [0, 30, 40, 50, 60, 70]
                    const BasesMin = [0, 10, 13.3, 16.7, 20, 23.3]
                    const ScalingMin = [0, .2, .2, .2, .2, .2]
                    const ScalingMax = [0, .6, .6, .6, .6, .6]
                    const Type = "magic damage"
                    const Max = BasesMax[PointsQ] + (ScalingMax[PointsQ]*ThisChampion_AP) + (EnemyChampion_maxHealth*((ThisChampion_AP/100)*.03))
                    const Min = BasesMin[PointsQ] + (ScalingMin[PointsQ]*ThisChampion_AP) + (EnemyChampion_maxHealth*((ThisChampion_AP/100)*.01))
                    const Tag = "When the blasts meet, the gusts form a tornado that advances for 1.5 seconds, dealing magic damage every 0.5 seconds to every enemy within, with the target's health ratio capped at 150 damage against monsters."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        if (ability === "1") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0,0,0,0,0,0]
                    const Scaling = [0, .08, .11, .14, .17, .2]
                    const Type = "magic shield"
                    const Max = (Bases[PointsW] + (Scaling[PointsW]*ThisChampion_maxHealth))
                    const Tag = "Galio gains a shield that exclusively absorbs magic damage, refreshing after not taking damage for 12 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                else if (i === 2) {
                    const BasesMax = [0, 60 , 90 , 120 , 150 , 180]
                    const BasesMin = [0,20 , 30 , 40 , 50 , 60]
                    const ScalingMin = [0, .2, .2, .2, .2, .2]
                    const ScalingMax = [0, .6, .6, .6, .6, .6]
                    const Type = "magic damage"
                    const Max = BasesMax[PointsW] + (ScalingMax[PointsW]*ThisChampion_AP)
                    const Min = BasesMin[PointsW] + (ScalingMin[PointsW]*ThisChampion_AP)
                    const Tag = "Affected enemies take magic damage, increased by 0% - 200% (based on charge time)."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //E
        if (ability === "2") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 100 , 130 , 160 , 190 , 220 ]
                    const Scaling = [0, 0.9, 0.9, 0.9, 0.9, 0.9]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                    const Tag = "Galio steps backwards before dashing forward, though not through terrain. He stops upon hitting an enemy champion, dealing them and all enemies along the way magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        if (ability === "3") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 150 , 250 , 350 ]
                    const Scaling = [0, 0.7, 0.7, 0.7]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "Upon impact, Galio deals magic damage to all nearby enemies."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

const GalioPassive  = (list_effects_passive, ThisChampion_level, ThisChampion_maxAD, ThisChampion_AP, ThisChampion_bonusMR) => {
    const Bases = [0, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80]
    const Type = "magic damage"
    const Max = ThisChampion_maxAD + (ThisChampion_AP*.5) + (ThisChampion_bonusMR*.4) + Bases[ThisChampion_level]
    const Tag = "Galio's next basic attack deals 12 - 80 (based on level) (+ 100% AD) (+ 50% AP) (+ 40% bonus magic resistance) total magic damage to its target and all enemies around it."
    const Obj = {Max: Max, Type: Type, Tag: Tag}
    list_effects_passive = [Obj]
    return list_effects_passive
}

export { Galio, GalioPassive }