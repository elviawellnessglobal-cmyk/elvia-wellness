module.exports = function fraudCheck(req) {
  const suspiciousIPs = [];

  if (suspiciousIPs.includes(req.ip)) {
    return false;
  }

  return true;
};
