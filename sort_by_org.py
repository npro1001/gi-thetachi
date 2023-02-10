sororities = {
    'alphaDeltaPi': ['adpi', 'a d pi', 'alpha delta pi', 'ΑΔΠ'],
    'alphaEpsilonPhi': ['aephi', 'a e phi', 'alpha epsilon phi', 'ΑΕΦ'],
    'alphaXiDelta': ['axid', 'a xi d', 'apha xi delta', 'ΑΞΔ'],
    'chiOmega': ['chio', 'chi o', 'chi omega', 'ΧΩ'],
    'triDelta': ['tridelt', 'tri delt', 'tri delta', 'delta delta delta', 'ΔΔΔ'],
    'deltaZeta': ['dz', 'd z', 'delta zeta', 'ΔΖ'],
    'gammaPhiBeta': ['gphibeta', 'gamma phi', 'gamma phi beta', 'ΓΦΒ'],
    'kappaAlphaTheta': ['kat', 'kappa alpha theta', 'theta', 'KAO', 'ΚΑΘ'],
    'kappaDelta': ['kd', 'k d', 'kappa delta', 'ΚΔ'],
    'kappaKappaGamma': ['kkg', 'k k g', 'kappa gamma', 'ΚΚΓ'],
    'piBetaPhi': ['piphi', 'pi phi', 'pi beta phi', 'ΠΒΦ'],
    'zetaTauAlpha': ['zta', 'z t a', 'zeta', 'zeta tau alpha', 'ΖΤΑ']
}

def find_org(transaction_note):
    print("Searching for string matches in transaction note...")
    note = transaction_note
    for org_name, org_slugs in sororities.items():
        for s in org_slugs:
            if s.lower() in note.lower():
                return org_name
    return '** FLAGGED **'
