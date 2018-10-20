const LeBlanc = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            //¿Cuantos efectos tiene la habilidad?
            const Effects = 4
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const BasesMax = [0, 55 , 80 , 105 , 130 , 155 ]
                    const ScalingMax = [0, .4, .4, .4, .4, .4]
                    const Type = "magic damage"
                    const Max = BasesMax[PointsQ] + (ScalingMax[PointsQ]*ThisChampion_AP)
                    const Tag = "LeBlanc projects an orb towards the target enemy, dealing magic damage and marking them for 3.5 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 2) {
                    const BasesMax = [0, 55 , 80 , 105 , 130 , 155 ]
                    const ScalingMax = [0, .4, .4, .4, .4, .4]
                    const Type = "magic damage"
                    const Max = BasesMax[PointsQ] + (ScalingMax[PointsQ]*ThisChampion_AP)
                    const Tag = "The mark will be consumed once LeBlanc damages the marked target with an ability, dealing the same magic damage again."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 3) {
                    const BasesMax = [0, 70 , 140 , 210]
                    const ScalingMax = [0, .4, .4, .4]
                    const Type = "magic damage"
                    const Max = BasesMax[PointsR] + (ScalingMax[PointsR]*ThisChampion_AP)
                    const Tag = "MIMIC SIGIL OF MALICE: Deals modified damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 4) {
                    const BasesMax = [0, 140 , 280 , 420]
                    const ScalingMax = [0, .8, .8, .8]
                    const Type = "magic damage"
                    const Max = BasesMax[PointsR] + (ScalingMax[PointsR]*ThisChampion_AP)
                    const Tag = "MIMIC SIGIL OF MALICE: Double damage upon triggering the mark."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        else if (ability === "1") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 85 , 125 , 165 , 205 , 245 ]
                    const Scaling = [0, .6, .6, .6, .6, .6]
                    const Type = "magic damage"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP)
                    const Tag = "LeBlanc dashes to the target location, damaging all nearby enemies upon arrival and leaving a return pad at the cast location for 4 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 2) {
                    const Bases = [0, 150 , 300 , 450]
                    const Scaling = [0, .75, .75, .75]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "MIMIC DISTORTION: Deals modified damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //E
        else if (ability === "2") {
            const Effects = 4
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 40 , 60 , 80 , 100 , 120]
                    const Scaling = [0, 0.3, 0.3, 0.3, 0.3, 0.3]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                    const Tag = "LeBlanc flings an illusory chain in the target direction, dealing magic damage to the first enemy it hits and tethering herself to them for 1.5 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                else if (i === 2) {
                    const Bases = [0, 60 , 90 , 120 , 150 , 180]
                    const Scaling = [0, 0.7, 0.7, 0.7, 0.7, 0.7]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                    const Tag = "The target is revealed while the tether is attached, and if it is not broken the target will be rooted for 1.5 seconds and dealt additional magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Primer efecto
                else if (i === 3) {
                    const Bases = [0, 70 , 140 , 210]
                    const Scaling = [0, 0.4, 0.4, 0.4]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "MIMIC ETHEREAL CHAINS: Deals modified damage and "
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                else if (i === 4) {
                    const Bases = [0, 140 , 280 , 420]
                    const Scaling = [0, 0.8, 0.8, 0.8]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "MIMIC ETHEREAL CHAINS: Double damage upon rooting."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        else if (ability === "3") {
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { LeBlanc }