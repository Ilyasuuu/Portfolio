'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X as CloseIcon, ChevronLeft, ChevronRight, Mail, Linkedin, Copy, Check } from 'lucide-react';
import GlassIdentityCard from './GlassIdentityCard';
import DustParticles from './DustParticles';
import Planet from './Planet';
import { getImagePath } from '@/lib/utils';
import { ITEMS, PROJECTS_DATA } from '@/data/portfolio-content';
