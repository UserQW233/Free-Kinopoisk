function update_able($current_version, $last_version) {
    if (GM_info.script.includes('newway')) {
        if ($current_version.includes('/') && !$last_version.includes('/')) return 1;
    }

    let $v1 = $current_version.split(/[./-]/).map(Number).filter(s => !isNaN(s));
    let $v2 = $last_version.split(/[./-]/).map(Number).filter(s => !isNaN(s));

    if (JSON.stringify($v1) === JSON.stringify($v2)) return 0;

    let $n1,$n2;
    for (let i = 0; i < Math.max($v1.length, $v2.length); i++) {
        $n1 = $v1[i] || 0;
        $n2 = $v2[i] || 0;

        if ($n1 > $n2) {return 0} else if ($n1 < $n2) {break}
    }
    return 1;
};
