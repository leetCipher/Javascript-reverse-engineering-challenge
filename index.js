// FLAG{7H3_D3V3L0P3R_700L5_4R3_5UP3R_H4CKY_1337_700L5}
const flagInput = document.getElementById("flag")
const checkButton = document.getElementById("check_flag")
const correctFlag = document.getElementById("correct_flag")
const wrongFlag = document.getElementById("wrong_flag")

const checkFlag = () => {
	let flag = flagInput.value
	if (flag.length != (0x3b ^ 0xc) - 0x3) {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}
	if (flag.charAt(0)  !== String.fromCharCode((((0x39 % 0xc) * 0x9) ^ 0xa) - 0x15) ||
		flag.charAt(1)  !== String.fromCharCode(((((0x41 % 0x999) * 0xF) % 0x17) + 0x1d) * 0x2) ||
		flag.charAt(2)  !== String.fromCharCode((((((0x35 % 0x6) ^ 0x355) >> 0x5) - 0x1) * 0x3) - 0xa) ||
		flag.charAt(3)  !== String.fromCharCode(((((((0x3d % 0x7) << 0x7) / 0xa) ^ 0x15) * 0x3) % 0x57) - 0xa) ||
		flag.charAt(4)  !== String.fromCharCode((((((((0x6b % 0x25) * 0x5) ^ 0xfff) >> 0x4) * 0xe) & 0x55) * 0x2) - 0xd) ||
		flag.charAt(51) !== String.fromCharCode(((((((((0x71 % 0x14) * 0xdc) / 0x16) << 0x5) / 0x10) >> 0x2) + 0x32) ^ 0xe)))
	{
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}
	
	if (flag.charCodeAt(5).toString(2) !== "110111"  ||
		flag.charCodeAt(6).toString(2) !== "1001000" ||
		flag.charCodeAt(7).toString(2) !== "110011")
	{
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if ((parseInt(flag.charCodeAt(8).toString()) ^ 0x2f) !== 0x70) {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if (convertAsciiToHex(flag.substring(9, 24)) !== "443356334c305033525f3730304c35") {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if ((parseInt(flag.charCodeAt(24).toString()) ^ 0x2f) !== 0x70) {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if (flag.charCodeAt(25).toString(8) !== "64"  ||
		flag.charCodeAt(26).toString(8) !== "122" ||
		flag.charCodeAt(27).toString(8) !== "63")
	{
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if ((parseInt(flag.charCodeAt(28).toString()) ^ 0x2f) !== 0x70) {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if (convertAsciiToHex(flag.substring(29, 40).split("").reverse().join("")) !== "594b4334485f5233505535") {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if ((parseInt(flag.charCodeAt(40).toString()) ^ 0x2f) !== 0x70) {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	sha1Sum(flag.substring(41, 45)).then(hash => {
		if (hash !== "77ba9cd915c8e359d9733edcfe9c61e5aca92afb") {
			wrongFlag.classList.toggle("flag_status")
			setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
			return false
		}
	})

	if ((parseInt(flag.charCodeAt(45).toString()) ^ 0x2f) !== 0x70) {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if (btoa(convertAsciiToHex(flag.substring(46, 51).split("").reverse().join(""))) !== "MzU0YzMwMzAzNw==") {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

		correctFlag.classList.add("flag_status")

}

const sha1Sum = str => {
	let buffer = new TextEncoder("UTF-8").encode(str);
	return crypto.subtle.digest("SHA-1", buffer).then(digest => {
		return hexEncodeRawBytes(digest);
	});
}

const hexEncodeRawBytes = digest => {
	let view = new DataView(digest);
	let hexEncodedHash = "";
	for (let i = 0; i < view.byteLength; i += 4) {
		let hexString = view.getUint32(i).toString(16);
		let padding = '00000000'
		let paddedHexString = (padding + hexString).slice(-padding.length)
		hexEncodedHash += paddedHexString;
	}
	return hexEncodedHash;
}

const convertAsciiToHex = str => {
	let hexBytes = ""
	for (let byte of str.split("")) {
		hexBytes += byte.charCodeAt().toString(16)
	}
	return hexBytes
}

checkButton.addEventListener("click", checkFlag)

