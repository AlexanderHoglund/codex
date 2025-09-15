"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let lastTimestamp: number | null = null;
    let initialized = false;

    const ball = {
      x: 0,
      y: 0,
      radius: 24,
      velocityX: 180,
      velocityY: 220,
    };

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      if (typeof context.resetTransform === "function") {
        context.resetTransform();
      } else {
        context.setTransform(1, 0, 0, 1, 0, 0);
      }

      context.scale(dpr, dpr);
      ball.radius = Math.max(16, Math.min(width, height) * 0.08);

      if (!initialized) {
        ball.x = width * 0.3;
        ball.y = height * 0.35;
        initialized = true;
      } else {
        ball.x = Math.min(Math.max(ball.radius, ball.x), Math.max(ball.radius, width - ball.radius));
        ball.y = Math.min(Math.max(ball.radius, ball.y), Math.max(ball.radius, height - ball.radius));
      }
    };

    const draw = (timestamp: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      ball.x += ball.velocityX * delta;
      ball.y += ball.velocityY * delta;

      if (ball.x + ball.radius >= width) {
        ball.x = width - ball.radius;
        ball.velocityX *= -1;
      } else if (ball.x - ball.radius <= 0) {
        ball.x = ball.radius;
        ball.velocityX *= -1;
      }

      if (ball.y + ball.radius >= height) {
        ball.y = height - ball.radius;
        ball.velocityY *= -1;
      } else if (ball.y - ball.radius <= 0) {
        ball.y = ball.radius;
        ball.velocityY *= -1;
      }

      context.clearRect(0, 0, width, height);

      const backgroundGradient = context.createLinearGradient(0, 0, width, height);
      backgroundGradient.addColorStop(0, "rgba(59, 130, 246, 0.15)");
      backgroundGradient.addColorStop(1, "rgba(14, 165, 233, 0.4)");
      context.fillStyle = backgroundGradient;
      context.fillRect(0, 0, width, height);

      context.save();
      context.fillStyle = "rgba(15, 23, 42, 0.35)";
      const shadowScale = 1 - Math.min(1, ball.y / height) * 0.4;
      context.beginPath();
      context.ellipse(
        ball.x,
        height - 24,
        ball.radius * 0.9,
        Math.max(6, ball.radius * 0.45 * shadowScale),
        0,
        0,
        Math.PI * 2,
      );
      context.fill();
      context.restore();

      context.save();
      const ballGradient = context.createRadialGradient(
        ball.x - ball.radius * 0.3,
        ball.y - ball.radius * 0.35,
        ball.radius * 0.2,
        ball.x,
        ball.y,
        ball.radius,
      );
      ballGradient.addColorStop(0, "#f8fafc");
      ballGradient.addColorStop(0.4, "#38bdf8");
      ballGradient.addColorStop(1, "#0ea5e9");
      context.fillStyle = ballGradient;
      context.shadowColor = "rgba(56, 189, 248, 0.45)";
      context.shadowBlur = 24;
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fill();
      context.restore();

      animationFrameId = window.requestAnimationFrame(draw);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    animationFrameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100">
      <div className="flex flex-col items-center gap-6 w-full px-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold sm:text-4xl">Canvas Bouncing Ball</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            A playful canvas sketch rendered in real time with the HTML5 Canvas API. The ball glides across the
            stage, bouncing from edge to edge while a soft glow trails behind it.
          </p>
        </div>
        <div className="w-full max-w-2xl">
          <canvas
            ref={canvasRef}
            className="w-full aspect-[4/3] rounded-3xl border border-white/15 bg-slate-900/80 backdrop-blur shadow-[0_20px_60px_rgba(15,23,42,0.45)]"
          />
        </div>
        <Link
          href="/japanese-landscape"
          className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-5 py-2 text-sky-300 transition hover:border-sky-300/70 hover:text-sky-100"
        >
          <span aria-hidden>→</span>
          Explore the Japanese rain landscape
        </Link>
      </div>
    </main>
  );
}
