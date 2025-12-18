import React, { useEffect, useMemo, useState } from 'react';

function formatTs(ts) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}

function CheckIn({ user, showToast }) {
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({ today: '', todayCheckedIn: false, checkins: [] });

  const canCheckIn = !!user && !data.todayCheckedIn && !posting;

  const total = useMemo(() => data.checkins.length, [data.checkins.length]);

  const refresh = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkins', { method: 'GET' });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || '加载失败');
      setData({
        today: json.today,
        todayCheckedIn: json.todayCheckedIn,
        checkins: json.checkins || [],
      });
    } catch (e) {
      setError(e?.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const doCheckIn = async () => {
    if (!user) return;
    setPosting(true);
    setError('');
    try {
      const res = await fetch('/api/checkins', { method: 'POST' });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || '打卡失败');
      setData({
        today: json.today,
        todayCheckedIn: json.todayCheckedIn,
        checkins: json.checkins || [],
      });
      showToast?.('打卡成功');
    } catch (e) {
      setError(e?.message || '打卡失败');
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="checkin-page">
      <div className="checkin-hero">
        <h1 className="checkin-title">
          <span className="highlight">打卡</span>
        </h1>
        <p className="checkin-subtitle">GitHub 登录后可进行每日打卡，并查看历史打卡记录（按 UTC 日期统计）。</p>

        {!user ? (
          <div className="checkin-login-hint">
            <div className="hint-title">尚未登录</div>
            <div className="hint-desc">请先使用 GitHub 登录，然后再进行打卡与查看记录。</div>
          </div>
        ) : (
          <div className="checkin-actions">
            <button
              className={`checkin-btn ${canCheckIn ? '' : 'disabled'}`}
              type="button"
              onClick={doCheckIn}
              disabled={!canCheckIn}
            >
              {posting ? '打卡中...' : data.todayCheckedIn ? '今日已打卡' : '今日打卡'}
            </button>
            <div className="checkin-summary">
              <div className="summary-item">
                <div className="summary-label">今日</div>
                <div className="summary-value">{data.today || '-'}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">累计</div>
                <div className="summary-value">{total} 天</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {user ? (
        <div className="checkin-card">
          <div className="checkin-card-header">
            <div className="checkin-card-title">打卡记录</div>
            <button className="checkin-refresh" type="button" onClick={refresh} disabled={loading}>
              {loading ? '刷新中...' : '刷新'}
            </button>
          </div>

          {error ? <div className="checkin-error">{error}</div> : null}

          {loading ? (
            <div className="checkin-empty">加载中...</div>
          ) : data.checkins.length === 0 ? (
            <div className="checkin-empty">暂无打卡记录</div>
          ) : (
            <div className="checkin-list">
              {data.checkins.map((c, idx) => (
                <div key={`${c.date}-${idx}`} className="checkin-row">
                  <div className="checkin-date">{c.date}</div>
                  <div className="checkin-ts">{formatTs(c.ts)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default CheckIn;
