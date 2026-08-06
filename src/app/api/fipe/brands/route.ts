import { NextResponse } from 'next/server';
import { getBrands } from '@/services/fipe/brands';

export async function GET() {
  try {
    const data = await getBrands();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error?.message ?? 'Error fetching brands' }, { status: 500 });
  }
}
