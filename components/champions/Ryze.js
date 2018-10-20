const Ryze = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            const Effects = 3
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 60 , 85 , 110 , 135 , 160 , 185]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (.45*ThisChampion_AP) + (.03*ThisChampion_bonusMana)
                    const Tag = "Ryze unleashes a runic blast in the target direction, dealing magic damage to the first enemy struck and consuming all of his Runes."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                if (i === 2) {
                    const Bases = [0, 65 , 70 , 75 , 80 , 85 , 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180]
                    const Type = "shield"
                    const Max = Bases[ThisChampion_lv] + (ThisChampion_bonusMana*.03) + (ThisChampion_AP*.6)
                    const Tag = "If Ryze consumes 2 Runes, he shields himself for 65 - 150 (based on level) (+ 60% AP) (+ 3% bonus mana) damage for 2 seconds and gains bonus movement speed for the duration."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                if (i === 3) {
                    const Bases = [0, 60 , 85 , 110 , 135 , 160 , 185]
                    const BasesFlux = [0 , 1.4, 1.5, 1.6, 1.7, 1.8]
                    const Type = "magic damage"
                    const Max = (Bases[PointsQ] + (.45*ThisChampion_AP) + (.03*ThisChampion_bonusMana)) * (BasesFlux[PointsE])
                    const Tag = "FLUX: Overload deals increased damage, based on Spell Flux's rank, and spreads to all nearby enemies marked with Flux."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        else if (ability === "1") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 80 , 100 , 120 , 140 , 160]
                    const Type = "magic damage"
                    const Max = Bases[PointsW] + (.6*ThisChampion_AP) + (ThisChampion_bonusMana*.01)
                    const Tag = "Ryze instantly deals magic damage and roots the target enemy for 0.75 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //E
        else if (ability === "2") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 70 , 90 , 110 , 130 , 150]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (.3*ThisChampion_AP) + (ThisChampion_bonusMana*.02)
                    const Tag = "Ryze hurls an orb of runic energy at the target enemy, dealing magic damage and marking them with Flux for 3 seconds, causing his next basic ability against them to consume the mark and gain bonus effects."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                if (i === 2) {
                    const Bases = [0, 35 , 45 , 55 , 65 , 75]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (.15*ThisChampion_AP) + (ThisChampion_bonusMana*.01)
                    const Tag = "FLUX: Spell Flux spreads to all nearby enemies, dealing 50% damage and marking them with Flux."
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

export { Ryze }