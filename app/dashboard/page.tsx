"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

interface Metrics {
  performance: number;
  accessibility: number;
  "best-practices": number;
  seo: number;
  timestamp: string;
}

interface Event {
  event: string;
  props?: Record<string, any>;
  timestamp: string;
}

export default function DashboardPage() {
  const [key, setKey] = useState("");
  const [data, setData] = useState<{ metrics: Metrics | null; events: Event[] } | null>(null);
  const [error, setError] = useState("");

  const handleAccess = async () => {
    if (!key) {
      setError("Please enter a key");
      return;
    }

    try {
      const res = await fetch(`/api/dashboard?key=${key}`);
      
      if (!res.ok) {
        setError("Invalid key");
        return;
      }

      const dashboardData = await res.json();
      setData(dashboardData);
      setError("");
    } catch (err) {
      setError("Failed to load dashboard");
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Dashboard Access</CardTitle>
            <CardDescription>Enter your dashboard key to access metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
                {error}
              </div>
            )}
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Dashboard Key"
              className="w-full px-4 py-2 rounded-lg border bg-bg-elev-1"
            />
            <Button onClick={handleAccess} className="w-full">
              Access Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const metrics = data.metrics;
  const metricsStatus = metrics ? (
    metrics.performance >= 95 &&
    metrics.accessibility >= 95 &&
    metrics["best-practices"] >= 95 &&
    metrics.seo >= 95
  ) : null;

  return (
    <div className="min-h-screen bg-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-content mb-2">
            Metrics Dashboard
          </h1>
          <p className="text-muted">Performance monitoring and analytics</p>
        </div>

        {/* Metrics Status */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-accent/20">
              <CardHeader className="pb-3">
                <CardDescription>Performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-content">{metrics.performance}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Accessibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-content">{metrics.accessibility}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Best Practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-content">{metrics["best-practices"]}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>SEO</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-content">{metrics.seo}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Status Alert */}
        {metrics && (
          <Card className="mb-8 border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                {metricsStatus ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-accent2" />
                    <div>
                      <p className="font-semibold text-content">All metrics above threshold</p>
                      <p className="text-sm text-muted">
                        Last checked: {new Date(metrics.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-6 w-6 text-accent" />
                    <div>
                      <p className="font-semibold text-content">Some metrics below threshold</p>
                      <p className="text-sm text-muted">
                        Last checked: {new Date(metrics.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Last activity from the site</CardDescription>
          </CardHeader>
          <CardContent>
            {data.events.length === 0 ? (
              <p className="text-muted text-center py-8">No events yet</p>
            ) : (
              <div className="space-y-2">
                {data.events.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border/50 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-content">{event.event}</p>
                      <p className="text-xs text-muted">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}







